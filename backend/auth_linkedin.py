from authlib.integrations.starlette_client import OAuth
import requests
from fastapi import APIRouter, Request, HTTPException
from starlette.responses import RedirectResponse
from database import get_db_connection
from auth import hash_password, verify_password, create_access_token
import os
import httpx
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

linkedin_oauth = OAuth()

linkedin_oauth.register(
    name="linkedin",
    client_id="86wrj1qg8bjwkn",
    client_secret="WPL_AP1.Y2IDurvLiMfRxpLs.W+HXQA==",
    authorize_url="https://www.linkedin.com/oauth/v2/authorization",
    access_token_url="https://www.linkedin.com/oauth/v2/accessToken",
    client_kwargs={
        "scope": "openid profile email"    }
    
)


@router.get("/auth/linkedin/login")
async def linkedin_login(request: Request):
    redirect_uri = "http://localhost:8000/auth/linkedin/callback"
    return await linkedin_oauth.linkedin.authorize_redirect(request, redirect_uri)


@router.get("/auth/linkedin/callback")
async def linkedin_callback(code:str = None, request: Request = None):
    token_res = requests.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:8000/auth/linkedin/callback",
            "client_id": "86wrj1qg8bjwkn",
            "client_secret": "WPL_AP1.Y2IDurvLiMfRxpLs.W+HXQA==",
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    if token_res.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch LinkedIn access token")

    access_token = token_res.json()["access_token"]

    # -------------------------
    # Fetch profile
    # -------------------------
    profile_res = requests.get(
            "https://api.linkedin.com/v2/userinfo",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )

    
    if profile_res.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch LinkedIn user info")

    profile = profile_res.json()
    email = profile["email"]
    first_name = profile["given_name"]
    last_name = profile["family_name"]
    # --- DB ---
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )
    user = cur.fetchone()

    if not user:
        cur.execute(
            """
            INSERT INTO users (first_name, last_name, email, password, auth_provider)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (first_name, last_name, email, "", "linkedin")
        )
        user_id = cur.fetchone()[0]
        conn.commit()
    else:
        user_id = user[0]

    cur.close()
    conn.close()

    jwt_token = create_access_token({
        "sub": str(user_id),
        "email": email
    })

    frontend_redirect = f"http://localhost:3000/oauth-success?token={jwt_token}"
    return RedirectResponse(frontend_redirect)
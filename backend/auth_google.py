from authlib.integrations.starlette_client import OAuth
import os
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from fastapi import APIRouter, Request, HTTPException
from starlette.responses import RedirectResponse
from loggingsetup import logger
from database import get_db_connection
from auth import create_access_token
from config import BACKEND_URL, FRONTEND_URL

router = APIRouter()

google_oauth = OAuth()

google_oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile"
    }
)


@router.get("/auth/linkedin/login")
async def google_login(request: Request):
    redirect_uri = f"{BACKEND_URL}/auth/google/callback"
    return await google_oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(code:str = None, request: Request = None):
    token = await google_oauth.google.authorize_access_token(request)

    if not token:
        logger.error("Google OAuth authorization failed")
        raise HTTPException(status_code=400, detail="Google OAuth authorization failed")
    
    user_info = token.get("userinfo")

    email = user_info["email"]
    name = user_info["name"]

    logger.info(f"Google OAuth callback received for email: {email}")

    conn = get_db_connection()
    cur = conn.cursor()

    # Check if user exists
    cur.execute("SELECT id, first_name, last_name, email FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    if not user:
        logger.info(f"Creating new user for Google email: {email}")
        first_name = name.split(" ")[0]
        last_name = " ".join(name.split(" ")[1:]) if len(name.split(" ")) > 1 else ""

        cur.execute(
            """
            INSERT INTO users (first_name, last_name, email, password, auth_provider)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (first_name, last_name, email, "", "google")
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
    logger.info(f"Generated JWT token for Google user {email}")
    # Redirect back to frontend
    return RedirectResponse(
        url=f"{FRONTEND_URL}/oauth-success?token={jwt_token}"
    )

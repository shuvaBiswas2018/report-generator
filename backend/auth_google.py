import logging
from authlib.integrations.starlette_client import OAuth
import os
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL, FRONTEND_URL
from fastapi import APIRouter, Request, HTTPException
from starlette.responses import RedirectResponse
from database import get_db_connection
from auth import create_access_token

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


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


@router.get("/auth/google/login")
async def google_login(request: Request):
    redirect_uri = f"{BACKEND_URL}/auth/google/callback"
    logger.info("Initiating Google OAuth login")
    return await google_oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    try:
        token = await google_oauth.google.authorize_access_token(request)
    except Exception as e:
        logger.error(f"Google OAuth token error: {e}")
        raise HTTPException(status_code=400, detail="Google OAuth failed")

    if not token:
        raise HTTPException(status_code=400, detail="No token received")

    user_info = token.get("userinfo")
    if not user_info:
        user_info = await google_oauth.google.parse_id_token(request, token)

    email = user_info["email"]
    name = user_info.get("name", "")

    logger.info(f"Google login successful for {email}")

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    if not user:
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

    return RedirectResponse(
        url=f"{FRONTEND_URL}/oauth-success?token={jwt_token}"
    )

import os
import requests
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
from datetime import datetime

from database import get_db_connection
from auth import create_access_token
from config import BACKEND_URL, FRONTEND_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

router = APIRouter()

GITHUB_CLIENT_ID = GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET = GITHUB_CLIENT_SECRET
REDIRECT_URI = f"{BACKEND_URL}/auth/github/callback"
FRONTEND_SUCCESS = f"{FRONTEND_URL}/oauth-success"


# -------------------------
# Step 1: Redirect to GitHub
# -------------------------
@router.get("/auth/github/login")
def github_login():
    github_auth_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=user:email"
    )
    return RedirectResponse(github_auth_url)


# -------------------------
# Step 2: GitHub Callback
# -------------------------
@router.get("/auth/github/callback")
def github_callback(code: str):
    # Exchange code → access token
    token_res = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": REDIRECT_URI,
        },
    )

    if token_res.status_code != 200:
        raise HTTPException(status_code=400, detail="GitHub token exchange failed")

    access_token = token_res.json().get("access_token")

    # Fetch profile
    profile = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"Bearer {access_token}"},
    ).json()

    # Fetch email (important!)
    emails = requests.get(
        "https://api.github.com/user/emails",
        headers={"Authorization": f"Bearer {access_token}"},
    ).json()

    primary_email = next(
        (e["email"] for e in emails if e.get("primary")), None
    )

    if not primary_email:
        raise HTTPException(status_code=400, detail="Email not found")

    name = profile.get("name") or profile.get("login")

    # -------------------------
    # DB: Find or Create User
    # -------------------------
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, first_name, last_name, email FROM users WHERE email=%s", (primary_email,))
    user = cur.fetchone()

    if not user:
        first, *rest = name.split(" ")
        last = " ".join(rest)

        cur.execute(
            """
            INSERT INTO users (first_name, last_name, email, password, auth_provider)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (first, last, primary_email, "", "github"),
        )
        user_id = cur.fetchone()[0]
        conn.commit()
    else:
        user_id = user[0]

    cur.close()
    conn.close()

    # -------------------------
    # Create JWT
    # -------------------------
    token = create_access_token({"sub": str(user_id), "email": primary_email})

    return RedirectResponse(
        f"{FRONTEND_SUCCESS}?token={token}"
    )

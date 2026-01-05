import os
from dotenv import load_dotenv

ENV = os.getenv("ENV", "local")

env_file = f".env.{ENV}"
load_dotenv(env_file)

BACKEND_URL = os.getenv("BACKEND_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")
DATABASE_URL = os.getenv("DATABASE_URL")
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GITHUB_CLIENT_ID = os.getenv("CLIENT_ID_GITHUB")
GITHUB_CLIENT_SECRET = os.getenv("CLIENT_SECRET_GITHUB")
LINKEDIN_CLIENT_ID = os.getenv("LINKEDIN_CLIENT_ID")
LINKEDIN_CLIENT_SECRET = os.getenv("LINKEDIN_CLIENT_SECRET")
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

print("Backernd URL:", BACKEND_URL, "Environment:", ENV, "Database URL:", DATABASE_URL, "SERPAPI Key:", SERPAPI_API_KEY)
import os
from dotenv import load_dotenv

ENV = os.getenv("ENV", "local")

env_file = f".env.{ENV}"
load_dotenv(env_file)

BACKEND_URL = os.getenv("BACKEND_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os 
import hashlib
import hmac

SECRET_KEY = "CHANGE_THIS_SECRET"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# Config
ITERATIONS = 260_000
SALT_SIZE = 16


# def hash_password(password: str) -> str:
#     salt = os.urandom(SALT_SIZE)
#     key = hashlib.pbkdf2_hmac(
#         "sha256",
#         password.encode("utf-8"),
#         salt,
#         ITERATIONS
#     )
#     return salt.hex() + ":" + key.hex()


# def verify_password(password: str, stored_hash: str) -> bool:
#     salt_hex, key_hex = stored_hash.split(":")
#     salt = bytes.fromhex(salt_hex)
#     stored_key = bytes.fromhex(key_hex)

#     new_key = hashlib.pbkdf2_hmac(
#         "sha256",
#         password.encode("utf-8"),
#         salt,
#         ITERATIONS
#     )

#     return hmac.compare_digest(new_key, stored_key)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # bcrypt max length = 72 bytes
    safe_password = password.encode("utf-8")[:72].decode("utf-8", errors="ignore")
    return pwd_context.hash(safe_password)

def verify_password(plain: str, hashed: str) -> bool:
    safe_password = plain.encode("utf-8")[:72].decode("utf-8", errors="ignore")
    return pwd_context.verify(safe_password, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from general import get_user_by_id
import os

SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_RANDOM_STRING")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
print(f"Auth Utils SECRET_KEY: {SECRET_KEY}")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    print(f"Decoding token: {token}")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    print("Verifying token...")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Token payload: {payload}")
        user_id: str = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError as e:
        print(f"JWTError: {e}")
        raise credentials_exception
    print(f"Token valid, user_id: {user_id}")
    user = get_user_by_id(int(user_id))
    print(f"Fetched user: {user}")
    if user is None:
        raise credentials_exception

    return user

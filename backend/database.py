from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import psycopg2
from psycopg2.extras import execute_values
from config import DATABASE_URL

print(f"Connecting to database at {DATABASE_URL}")


def get_db_connection():
    connection = psycopg2.connect(DATABASE_URL)
    return connection

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(bind=engine, autoflush=False)
# Base = declarative_base()

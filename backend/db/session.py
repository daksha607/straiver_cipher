from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Fallback to SQLite if DATABASE_URL is not set
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Create SQLModel engine
engine = create_engine(DATABASE_URL, echo=True)


# Dependency injection for FastAPI routes
def get_session():
    with Session(engine) as session:
        yield session


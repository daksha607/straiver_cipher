from db.session import engine
from models.chat_history import ChatHistory
from db.base import Base  # Make sure this points to your declarative_base

# This will create all tables if they don't exist
Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully.")

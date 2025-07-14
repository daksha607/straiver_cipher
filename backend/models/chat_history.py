from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

class ChatHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[str] = Field(default=None)  # Optional: Clerk user ID
    message: str
    reply: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

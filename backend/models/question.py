from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Question(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    user_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    answers: List["Answer"] = Relationship(back_populates="question")

from models.answer import Answer  # If you're adding this in question.py



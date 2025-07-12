from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class Answer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question_id: int = Field(foreign_key="question.id")
    content: str
    user_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    question: Optional["Question"] = Relationship(back_populates="answers")


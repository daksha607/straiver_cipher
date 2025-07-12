from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AnswerCreate(BaseModel):
    content: str

class AnswerRead(BaseModel):
    id: int
    question_id: int
    content: str
    user_id: str
    timestamp: datetime

    class Config:
        orm_mode = True

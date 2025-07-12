from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from .answer import AnswerRead  # for nested answer response

class QuestionCreate(BaseModel):
    title: str
    description: str

class QuestionRead(BaseModel):
    id: int
    title: str
    description: str
    user_id: str
    timestamp: datetime
    answers: List[AnswerRead] = []

    class Config:
        orm_mode = True


from pydantic import BaseModel

class AnswerCreate(BaseModel):
    content: str

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatHistoryResponse(BaseModel):
    id: int
    user_id: Optional[str]
    message: str
    reply: str
    timestamp: datetime  # This will automatically convert to ISO string

    class Config:
        orm_mode = True

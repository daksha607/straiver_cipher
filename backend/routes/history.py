from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_session
from models.chat_history import ChatHistory
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from auth.dependencies import verify_token

router = APIRouter()

# ✅ Pydantic response schema
class ChatHistoryResponse(BaseModel):
    id: int
    user_id: Optional[str] = None
    message: str
    reply: str
    timestamp: datetime

    class Config:
        orm_mode = True

# ✅ GET /history → only current user's history
@router.get("/history", response_model=List[ChatHistoryResponse])
def get_chat_history(
    user_id: str = Depends(verify_token),
    session: Session = Depends(get_session)
):
    history = (
        session.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.timestamp.desc())
        .all()
    )
    return history

# ✅ DELETE /history/{id} → only delete if user owns the message
@router.delete("/history/{history_id}")
def delete_history_item(
    history_id: int,
    user_id: str = Depends(verify_token),
    session: Session = Depends(get_session)
):
    item = session.get(ChatHistory, history_id)
    if not item:
        raise HTTPException(status_code=404, detail="History item not found")

    if item.user_id != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized to delete this item")

    session.delete(item)
    session.commit()
    return {"message": f"Deleted item {history_id}"}


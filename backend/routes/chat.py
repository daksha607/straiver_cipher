from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import os, requests
from dotenv import load_dotenv
from db.session import get_session
from models.chat_history import ChatHistory
from auth.dependencies import verify_token

# Load environment variables
load_dotenv()

router = APIRouter()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found in environment variables.")

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(
    req: ChatRequest,
    user_id: str = Depends(verify_token),  # ✅ Get authenticated user
    session: Session = Depends(get_session)
):
    # ✅ Save function that includes user_id
    def save_history(message: str, reply: str):
        try:
            history = ChatHistory(
                user_id=user_id,  # ✅ Save user ID
                message=message,
                reply=reply
            )
            session.add(history)
            session.commit()
        except Exception as db_err:
            session.rollback()
            raise HTTPException(status_code=500, detail=f"DB error: {str(db_err)}")

    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",  # Adjust for production
            "X-Title": "straiver-dsa-chatbot"
        }

        payload = {
            "model": "moonshotai/kimi-k2:free",
            "messages": [
                {"role": "system", "content": "You are a helpful DSA tutor."},
                {"role": "user", "content": req.message}
            ]
        }

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        response.raise_for_status()

        data = response.json()
        reply = data["choices"][0]["message"]["content"]

    except requests.exceptions.HTTPError as http_err:
        reply = f"(Fallback) Echo: {req.message}\n\n⚠️ HTTP error: {http_err.response.status_code} - {http_err.response.reason}"

    except Exception as e:
        reply = f"(Fallback) Echo: {req.message}\n\n⚠️ Error: {str(e)}"

    # ✅ Save with user_id included
    save_history(req.message, reply)

    return {"reply": reply}






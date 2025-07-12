from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define router for FastAPI
router = APIRouter()

# Define request body model
class ChatRequest(BaseModel):
    message: str

# Define chat endpoint
@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant for DSA learning."},
                {"role": "user", "content": req.message}
            ]
        )
        reply = response['choices'][0]['message']['content']
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


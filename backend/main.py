from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select

from models.question import Question
from models.answer import Answer
from schemas.question import QuestionCreate
from schemas.answer import AnswerCreate
from auth.dependencies import verify_token
from routes.chat import router as chat_router
from routes.history import router as history_router

from db.session import get_session, engine
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Enable CORS (Frontend at http://localhost:5173 or * for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with ["http://localhost:5173"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(chat_router)
app.include_router(history_router)

# Auto-create tables on startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "Straiver API running with Clerk auth 🔐"}

# ---------------------------
# 🧠 Questions & Answers APIs
# ---------------------------

@app.post("/questions")
def create_question(
    question: QuestionCreate,
    user_id: str = Depends(verify_token),
    session: Session = Depends(get_session)
):
    q = Question(**question.dict(), user_id=user_id)
    session.add(q)
    session.commit()
    session.refresh(q)
    return q

@app.get("/questions")
def get_all_questions(session: Session = Depends(get_session)):
    return session.exec(select(Question)).all()

@app.post("/questions/{question_id}/answers")
def create_answer(
    question_id: int,
    answer: AnswerCreate,
    user_id: str = Depends(verify_token),
    session: Session = Depends(get_session)
):
    a = Answer(**answer.dict(), question_id=question_id, user_id=user_id)
    session.add(a)
    session.commit()
    session.refresh(a)
    return a

@app.get("/questions/{question_id}")
def get_question_with_answers(question_id: int, session: Session = Depends(get_session)):
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    answers = session.exec(select(Answer).where(Answer.question_id == question_id)).all()
    return {"question": question, "answers": answers}




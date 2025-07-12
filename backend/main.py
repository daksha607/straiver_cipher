from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Session, select
from fastapi.middleware.cors import CORSMiddleware

from models.question import Question
from models.answer import Answer
from schemas.question import QuestionCreate
from schemas.answer import AnswerCreate
from auth.dependencies import verify_token
from routes.chat import router as chat_router

from db.session import get_session, engine  # ✅ Import the DB session and engine

from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS setup (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL like ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat routes
app.include_router(chat_router)

# Database table creation at startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Root test route
@app.get("/")
def read_root():
    return {"message": "Straiver API running with Clerk auth 🔐"}

# ✅ Create a new question
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

# ✅ Get all questions
@app.get("/questions")
def get_all_questions(session: Session = Depends(get_session)):
    return session.exec(select(Question)).all()

# ✅ Post an answer
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

# ✅ Get a question with all its answers
@app.get("/questions/{question_id}")
def get_question_with_answers(question_id: int, session: Session = Depends(get_session)):
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    answers = session.exec(select(Answer).where(Answer.question_id == question_id)).all()
    return {"question": question, "answers": answers}



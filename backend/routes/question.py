from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.question import QuestionCreate, QuestionOut
from crud import question as crud_question

router = APIRouter()

@router.get("/questions", response_model=list[QuestionOut])
def read_questions(db: Session = Depends(get_db)):
    return crud_question.get_questions(db)

@router.post("/questions", response_model=QuestionOut)
def post_question(question: QuestionCreate, db: Session = Depends(get_db)):
    return crud_question.create_question(db, question, user_id="demo_user")

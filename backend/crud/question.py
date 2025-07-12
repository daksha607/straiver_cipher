from sqlalchemy.orm import Session
from models.question import Question
from schemas.question import QuestionCreate

def create_question(db: Session, question: QuestionCreate, user_id: str):
    db_question = Question(**question.dict(), user_id=user_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def get_questions(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Question).offset(skip).limit(limit).all()

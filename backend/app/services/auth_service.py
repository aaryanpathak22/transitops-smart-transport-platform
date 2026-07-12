from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


def register_user(db: Session, user: UserCreate):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        raise Exception("Email already registered")

    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise Exception("Invalid email or password")

    if not verify_password(password, user.password):
        raise Exception("Invalid email or password")

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }
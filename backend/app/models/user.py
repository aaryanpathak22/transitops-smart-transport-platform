from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Enum as SqlEnum,
)

from app.db.base import Base


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    DISPATCHER = "DISPATCHER"
    DRIVER = "DRIVER"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(
        String(150),
        nullable=False,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    role = Column(
        SqlEnum(UserRole),
        default=UserRole.DISPATCHER,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )
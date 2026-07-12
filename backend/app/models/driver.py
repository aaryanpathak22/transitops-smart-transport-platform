from datetime import date, datetime
from enum import Enum

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Enum as SqlEnum,
)

from app.db.base import Base


class DriverStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    ASSIGNED = "ASSIGNED"
    OFF_DUTY = "OFF_DUTY"


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(
        String(150),
        nullable=False,
    )

    license_number = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    license_expiry = Column(
        Date,
        nullable=False,
    )

    phone = Column(
        String(20),
        nullable=False,
    )

    status = Column(
        SqlEnum(DriverStatus),
        default=DriverStatus.AVAILABLE,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )
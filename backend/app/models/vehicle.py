from datetime import datetime
from enum import Enum

from sqlalchemy import Column, Integer, String, Float, DateTime, Enum as SqlEnum

from app.db.base import Base


class VehicleStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    IN_TRANSIT = "IN_TRANSIT"
    MAINTENANCE = "MAINTENANCE"


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)

    registration_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    vehicle_type = Column(
        String(100),
        nullable=False,
    )

    cargo_capacity = Column(
        Float,
        nullable=False,
    )

    status = Column(
        SqlEnum(VehicleStatus),
        default=VehicleStatus.AVAILABLE,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )
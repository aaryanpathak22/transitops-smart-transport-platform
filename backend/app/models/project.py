from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Enum as SqlEnum,
)
from sqlalchemy.orm import relationship

from app.db.base import Base


class ProjectStatus(str, Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    IN_TRANSIT = "IN_TRANSIT"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    vehicle_id = Column(
        Integer,
        ForeignKey("vehicles.id"),
        nullable=False,
    )

    driver_id = Column(
        Integer,
        ForeignKey("drivers.id"),
        nullable=False,
    )

    origin = Column(String(255), nullable=False)

    destination = Column(String(255), nullable=False)

    cargo_weight = Column(Float, nullable=False)

    status = Column(
        SqlEnum(ProjectStatus),
        default=ProjectStatus.PENDING,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    vehicle = relationship("Vehicle")

    driver = relationship("Driver")
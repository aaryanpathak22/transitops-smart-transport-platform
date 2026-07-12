from enum import Enum

from pydantic import BaseModel, Field


class ProjectStatus(str, Enum):
    PENDING = "PENDING"
    ASSIGNED = "ASSIGNED"
    IN_TRANSIT = "IN_TRANSIT"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class ProjectCreate(BaseModel):
    vehicle_id: int
    driver_id: int
    origin: str
    destination: str
    cargo_weight: float = Field(gt=0)


class ProjectUpdate(BaseModel):
    status: ProjectStatus


class ProjectResponse(BaseModel):
    id: int
    vehicle_id: int
    driver_id: int
    origin: str
    destination: str
    cargo_weight: float
    status: ProjectStatus

    class Config:
        from_attributes = True
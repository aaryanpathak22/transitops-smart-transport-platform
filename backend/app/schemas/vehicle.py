from enum import Enum

from pydantic import BaseModel, Field


class VehicleStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    IN_TRANSIT = "IN_TRANSIT"
    MAINTENANCE = "MAINTENANCE"


class VehicleCreate(BaseModel):
    registration_number: str
    vehicle_type: str
    cargo_capacity: float = Field(gt=0)


class VehicleUpdate(BaseModel):
    vehicle_type: str | None = None
    cargo_capacity: float | None = Field(default=None, gt=0)
    status: VehicleStatus | None = None


class VehicleResponse(BaseModel):
    id: int
    registration_number: str
    vehicle_type: str
    cargo_capacity: float
    status: VehicleStatus

    class Config:
        from_attributes = True
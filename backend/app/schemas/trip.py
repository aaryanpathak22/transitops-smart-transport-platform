from pydantic import BaseModel
from typing import Optional


class TripCreate(BaseModel):
    vehicle_id: int
    driver_id: int
    source: str
    destination: str
    cargo_weight: float


class TripResponse(TripCreate):
    id: int
    status: str

    class Config:
        from_attributes = True
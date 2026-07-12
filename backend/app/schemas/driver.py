from datetime import date
from enum import Enum

from pydantic import BaseModel


class DriverStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    ASSIGNED = "ASSIGNED"
    OFF_DUTY = "OFF_DUTY"


class DriverCreate(BaseModel):
    full_name: str
    license_number: str
    license_expiry: date
    phone: str


class DriverUpdate(BaseModel):
    full_name: str | None = None
    license_expiry: date | None = None
    phone: str | None = None
    status: DriverStatus | None = None


class DriverResponse(BaseModel):
    id: int
    full_name: str
    license_number: str
    license_expiry: date
    phone: str
    status: DriverStatus

    class Config:
        from_attributes = True
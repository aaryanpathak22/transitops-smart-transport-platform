from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleResponse,
)

from app.services import vehicle_service

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"],
)


@router.post(
    "/",
    response_model=VehicleResponse,
)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
):
    return vehicle_service.create_vehicle(db, vehicle)


@router.get(
    "/",
    response_model=list[VehicleResponse],
)
def get_all_vehicles(
    db: Session = Depends(get_db),
):
    return vehicle_service.get_all_vehicles(db)


@router.get(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    return vehicle_service.get_vehicle(
        db,
        vehicle_id,
    )


@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse,
)
def update_vehicle(
    vehicle_id: int,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
):
    return vehicle_service.update_vehicle(
        db,
        vehicle_id,
        vehicle,
    )


@router.delete("/{vehicle_id}")
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    return vehicle_service.delete_vehicle(
        db,
        vehicle_id,
    )
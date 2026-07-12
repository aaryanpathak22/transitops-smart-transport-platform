from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate, VehicleUpdate


def create_vehicle(db: Session, vehicle: VehicleCreate):

    existing = (
        db.query(Vehicle)
        .filter(
            Vehicle.registration_number == vehicle.registration_number
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Vehicle registration already exists",
        )

    if vehicle.cargo_capacity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Cargo capacity must be greater than zero",
        )

    db_vehicle = Vehicle(**vehicle.model_dump())

    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)

    return db_vehicle


def get_all_vehicles(db: Session):
    return db.query(Vehicle).all()


def get_vehicle(db: Session, vehicle_id: int):

    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return vehicle


def update_vehicle(
    db: Session,
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
):

    vehicle = get_vehicle(db, vehicle_id)

    updates = vehicle_data.model_dump(exclude_unset=True)

    if (
        "cargo_capacity" in updates
        and updates["cargo_capacity"] <= 0
    ):
        raise HTTPException(
            status_code=400,
            detail="Cargo capacity must be greater than zero",
        )

    for key, value in updates.items():
        setattr(vehicle, key, value)

    db.commit()
    db.refresh(vehicle)

    return vehicle


def delete_vehicle(db: Session, vehicle_id: int):

    vehicle = get_vehicle(db, vehicle_id)

    db.delete(vehicle)
    db.commit()

    return {"message": "Vehicle deleted successfully"}
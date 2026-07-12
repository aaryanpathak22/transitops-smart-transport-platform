from datetime import date

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.driver import Driver
from app.schemas.driver import DriverCreate, DriverUpdate


def create_driver(db: Session, driver: DriverCreate):

    existing = (
        db.query(Driver)
        .filter(Driver.license_number == driver.license_number)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="License number already exists",
        )

    if driver.license_expiry <= date.today():
        raise HTTPException(
            status_code=400,
            detail="License has expired",
        )

    db_driver = Driver(**driver.model_dump())

    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)

    return db_driver


def get_all_drivers(db: Session):
    return db.query(Driver).all()


def get_driver(db: Session, driver_id: int):

    driver = (
        db.query(Driver)
        .filter(Driver.id == driver_id)
        .first()
    )

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    return driver


def update_driver(db: Session, driver_id: int, driver_data: DriverUpdate):

    driver = get_driver(db, driver_id)

    updates = driver_data.model_dump(exclude_unset=True)

    if (
        "license_expiry" in updates
        and updates["license_expiry"] <= date.today()
    ):
        raise HTTPException(
            status_code=400,
            detail="License has expired",
        )

    for key, value in updates.items():
        setattr(driver, key, value)

    db.commit()
    db.refresh(driver)

    return driver


def delete_driver(db: Session, driver_id: int):

    driver = get_driver(db, driver_id)

    db.delete(driver)
    db.commit()

    return {
        "message": "Driver deleted successfully"
    }
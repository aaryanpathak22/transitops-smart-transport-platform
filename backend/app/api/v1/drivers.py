from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.driver import (
    DriverCreate,
    DriverUpdate,
    DriverResponse,
)

from app.services import driver_service

router = APIRouter(
    prefix="/drivers",
    tags=["Drivers"],
)


@router.post(
    "/",
    response_model=DriverResponse,
)
def create_driver(
    driver: DriverCreate,
    db: Session = Depends(get_db),
):
    return driver_service.create_driver(db, driver)


@router.get(
    "/",
    response_model=list[DriverResponse],
)
def get_all_drivers(
    db: Session = Depends(get_db),
):
    return driver_service.get_all_drivers(db)


@router.get(
    "/{driver_id}",
    response_model=DriverResponse,
)
def get_driver(
    driver_id: int,
    db: Session = Depends(get_db),
):
    return driver_service.get_driver(
        db,
        driver_id,
    )


@router.put(
    "/{driver_id}",
    response_model=DriverResponse,
)
def update_driver(
    driver_id: int,
    driver: DriverUpdate,
    db: Session = Depends(get_db),
):
    return driver_service.update_driver(
        db,
        driver_id,
        driver,
    )


@router.delete("/{driver_id}")
def delete_driver(
    driver_id: int,
    db: Session = Depends(get_db),
):
    return driver_service.delete_driver(
        db,
        driver_id,
    )
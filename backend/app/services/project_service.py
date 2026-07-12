from datetime import date

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.project import Project, ProjectStatus
from app.models.vehicle import Vehicle, VehicleStatus
from app.models.driver import Driver, DriverStatus
from app.schemas.project import ProjectCreate


def create_project(db: Session, project: ProjectCreate):

    vehicle = db.query(Vehicle).filter(
        Vehicle.id == project.vehicle_id
    ).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    driver = db.query(Driver).filter(
        Driver.id == project.driver_id
    ).first()

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    # Vehicle availability
    if vehicle.status != VehicleStatus.AVAILABLE:
        raise HTTPException(
            status_code=400,
            detail="Vehicle is not available",
        )

    # Driver availability
    if driver.status != DriverStatus.AVAILABLE:
        raise HTTPException(
            status_code=400,
            detail="Driver is not available",
        )

    # License expiry validation
    if driver.license_expiry < date.today():
        raise HTTPException(
            status_code=400,
            detail="Driver license has expired",
        )

    # Cargo capacity validation
    if project.cargo_weight > vehicle.cargo_capacity:
        raise HTTPException(
            status_code=400,
            detail="Cargo exceeds vehicle capacity",
        )

    db_project = Project(
        vehicle_id=project.vehicle_id,
        driver_id=project.driver_id,
        origin=project.origin,
        destination=project.destination,
        cargo_weight=project.cargo_weight,
        status=ProjectStatus.ASSIGNED,
    )

    db.add(db_project)

    # Status transitions
    vehicle.status = VehicleStatus.IN_TRANSIT
    driver.status = DriverStatus.ASSIGNED

    db.commit()
    db.refresh(db_project)

    return db_project


def get_all_projects(db: Session):
    return db.query(Project).all()


def get_project(db: Session, project_id: int):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


def update_project_status(
    db: Session,
    project_id: int,
    status: ProjectStatus,
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    project.status = status

    vehicle = db.query(Vehicle).filter(
        Vehicle.id == project.vehicle_id
    ).first()

    driver = db.query(Driver).filter(
        Driver.id == project.driver_id
    ).first()

    if status == ProjectStatus.IN_TRANSIT:
        vehicle.status = VehicleStatus.IN_TRANSIT
        driver.status = DriverStatus.ASSIGNED

    elif status == ProjectStatus.COMPLETED:
        vehicle.status = VehicleStatus.AVAILABLE
        driver.status = DriverStatus.AVAILABLE

    elif status == ProjectStatus.CANCELLED:
        vehicle.status = VehicleStatus.AVAILABLE
        driver.status = DriverStatus.AVAILABLE

    db.commit()
    db.refresh(project)

    return project
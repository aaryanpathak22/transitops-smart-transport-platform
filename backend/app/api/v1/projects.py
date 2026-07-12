from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
)
from app.services import project_service

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("/", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
):
    return project_service.create_project(db, project)


@router.get("/", response_model=list[ProjectResponse])
def get_all_projects(
    db: Session = Depends(get_db),
):
    return project_service.get_all_projects(db)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    return project_service.get_project(db, project_id)


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project_status(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
):
    return project_service.update_project_status(
        db,
        project_id,
        project.status,
    )
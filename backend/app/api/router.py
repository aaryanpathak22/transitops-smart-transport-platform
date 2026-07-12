from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.vehicles import router as vehicle_router
from app.api.v1.drivers import router as driver_router
from app.api.v1.projects import router as project_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(vehicle_router)
api_router.include_router(driver_router)
api_router.include_router(project_router)
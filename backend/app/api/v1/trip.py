from fastapi import APIRouter

router = APIRouter(
    prefix="/trips",
    tags=["Trips"]
)


@router.get("/")
def get_all_trips():
    return {
        "message": "Trip Management API is under development."
    }
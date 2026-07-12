from fastapi import FastAPI

from app.api.router import api_router

app = FastAPI(
    title="TransitOps API",
    version="1.0.0",
)

app.include_router(api_router)


@app.get("/")
def health():
    return {
        "message": "TransitOps Backend Running"
    }
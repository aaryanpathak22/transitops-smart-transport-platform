from fastapi import FastAPI

app = FastAPI(
    title="TransitOps API",
    version="1.0.0"
)


@app.get("/")
def health():
    return {
        "message": "TransitOps Backend Running"
    }
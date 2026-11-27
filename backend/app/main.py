from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description=(
        "TerraSpectra prototype API. Dashboard and reference endpoints currently "
        "serve explicitly illustrative sample data. Prediction requests remain "
        "disabled until a trained and validated model is configured."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.api_v1_prefix)

@app.get("/", tags=["System"])
def root():
    return {
        "service": settings.app_name,
        "status": "ok",
        "docs": "/docs",
        "api_prefix": settings.api_v1_prefix,
    }

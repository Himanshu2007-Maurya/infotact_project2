import csv
import io
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from app.schemas.api import (
    AnalyticsResponse, DashboardSummary, HealthResponse, PredictionRequest,
    PredictionUnavailable, TimelinePoint,
)
from app.services.demo_data import ANALYTICS, DATA_NOTICE, DISEASES, FARMS

router = APIRouter()

@router.get("/health", response_model=HealthResponse, tags=["System"])
def health():
    return HealthResponse(
        status="ok",
        service="TerraSpectra API",
        version="1.0.0",
        environment="development",
        model_status="not_configured",
    )

@router.get("/dashboard/summary", response_model=DashboardSummary, tags=["Dashboard"])
def dashboard_summary():
    return DashboardSummary(
        total_farms=128,
        healthy_crops=86,
        at_risk_areas=24,
        average_crop_health=78.5,
        data_status="illustrative",
        disclaimer=DATA_NOTICE,
    )

@router.get("/farms", tags=["GIS"])
def list_farms(risk: str | None = Query(default=None, pattern="^(Low|Moderate|High)$")):
    farms = FARMS if risk is None else [farm for farm in FARMS if farm.risk == risk]
    return {
        "count": len(farms),
        "farms": [farm.model_dump() for farm in farms],
        "data_status": "illustrative",
        "disclaimer": DATA_NOTICE,
    }

@router.get("/analytics", response_model=AnalyticsResponse, tags=["Analytics"])
def analytics(
    crop: str | None = None,
    risk: str | None = Query(default=None, pattern="^(Low|Moderate|High)$"),
    month: str | None = None,
):
    records = ANALYTICS
    if crop and crop.lower() != "all":
        records = [r for r in records if r.crop.lower() == crop.lower()]
    if risk and risk.lower() != "all":
        records = [r for r in records if r.risk.lower() == risk.lower()]
    if month:
        records = [r for r in records if r.month.lower() == month.lower()]
    return AnalyticsResponse(
        count=len(records),
        records=records,
        data_status="illustrative",
        disclaimer=DATA_NOTICE,
    )

@router.get("/analytics/timeline", response_model=list[TimelinePoint], tags=["Analytics"])
def analytics_timeline(crop: str | None = None, risk: str | None = None):
    records = ANALYTICS
    if crop and crop.lower() != "all":
        records = [r for r in records if r.crop.lower() == crop.lower()]
    if risk and risk.lower() != "all":
        records = [r for r in records if r.risk.lower() == risk.lower()]

    months = [("January", "2026-01-15"), ("February", "2026-02-15"), ("March", "2026-03-15")]
    result = []
    for month, date in months:
        subset = [r for r in records if r.month == month]
        result.append(TimelinePoint(
            month=month,
            date=date,
            average_health=round(sum(r.health for r in subset) / len(subset), 1) if subset else None,
            monitored_records=len(subset),
            low_risk=sum(r.risk == "Low" for r in subset),
            moderate_risk=sum(r.risk == "Moderate" for r in subset),
            high_risk=sum(r.risk == "High" for r in subset),
        ))
    return result

@router.get("/diseases", tags=["Disease reference"])
def list_diseases(crop: str | None = None):
    diseases = DISEASES if not crop else [d for d in DISEASES if d.crop.lower() == crop.lower()]
    return {"count": len(diseases), "diseases": [d.model_dump() for d in diseases],
            "data_status": "reference_information"}

@router.get("/diseases/{slug}", tags=["Disease reference"])
def disease_detail(slug: str):
    for disease in DISEASES:
        if disease.slug == slug:
            return disease.model_dump()
    raise HTTPException(status_code=404, detail={"code": "DISEASE_NOT_FOUND", "message": "Disease reference not found."})

@router.get("/reports/analytics.csv", tags=["Reports"])
def download_analytics_csv():
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["crop", "risk", "health", "month", "data_status"])
    for record in ANALYTICS:
        writer.writerow([record.crop, record.risk, record.health, record.month, "illustrative"])
    buffer.seek(0)
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="terraspectra-analytics-demo.csv"'},
    )

@router.post(
    "/predictions",
    response_model=PredictionUnavailable,
    responses={503: {"model": PredictionUnavailable}},
    tags=["Inference"],
)
def create_prediction(payload: PredictionRequest):
    # Intentionally fail closed until a trained, validated model is registered.
    raise HTTPException(
        status_code=503,
        detail={
            "code": "MODEL_NOT_CONFIGURED",
            "message": "Prediction is unavailable because no trained and validated inference model is configured.",
            "model_status": "not_configured",
            "next_step": "Train and validate the model, export a supported checkpoint, then configure MODEL_PATH.",
        },
    )

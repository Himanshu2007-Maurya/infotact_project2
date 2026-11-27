from typing import Literal, Optional
from pydantic import BaseModel, Field

RiskLevel = Literal["Low", "Moderate", "High"]

class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: str
    version: str
    environment: str
    model_status: Literal["not_configured", "ready"]

class Farm(BaseModel):
    id: str
    name: str
    crop: str
    longitude: float
    latitude: float
    risk: RiskLevel
    intensity: float = Field(ge=0, le=1)
    data_status: Literal["illustrative", "observed", "model_prediction"] = "illustrative"

class DashboardSummary(BaseModel):
    total_farms: int
    healthy_crops: int
    at_risk_areas: int
    average_crop_health: float
    data_status: Literal["illustrative", "observed", "model_prediction"]
    disclaimer: str

class AnalyticsRecord(BaseModel):
    crop: str
    risk: RiskLevel
    health: int = Field(ge=0, le=100)
    month: str
    data_status: Literal["illustrative"] = "illustrative"

class AnalyticsResponse(BaseModel):
    count: int
    records: list[AnalyticsRecord]
    data_status: Literal["illustrative"]
    disclaimer: str

class TimelinePoint(BaseModel):
    month: str
    date: str
    average_health: Optional[float]
    monitored_records: int
    low_risk: int
    moderate_risk: int
    high_risk: int

class DiseaseInfo(BaseModel):
    slug: str
    name: str
    crop: str
    risk: RiskLevel
    description: str
    symptoms: list[str]
    actions: list[str]
    prevention: list[str]
    data_status: Literal["reference_information"] = "reference_information"

class PredictionRequest(BaseModel):
    farm_id: Optional[str] = None
    input_type: Literal["hyperspectral_patch"] = "hyperspectral_patch"
    note: Optional[str] = Field(default=None, max_length=500)

class PredictionUnavailable(BaseModel):
    code: str
    message: str
    model_status: Literal["not_configured"]
    next_step: str

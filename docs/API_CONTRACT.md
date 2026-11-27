# TerraSpectra API Contract for Frontend Integration

Base URL during local development: `http://127.0.0.1:8000`
API prefix: `/api/v1`

## 1. Health
`GET /api/v1/health`

```json
{
  "status": "ok",
  "service": "TerraSpectra API",
  "version": "1.0.0",
  "environment": "development",
  "model_status": "not_configured"
}
```

Use this endpoint for the frontend connection indicator. `status=ok` means the API is reachable; it does not mean the ML model is ready.

## 2. Overview cards
`GET /api/v1/dashboard/summary`

```json
{
  "total_farms": 128,
  "healthy_crops": 86,
  "at_risk_areas": 24,
  "average_crop_health": 78.5,
  "data_status": "illustrative",
  "disclaimer": "Illustrative prototype data only..."
}
```

## 3. GIS farm markers
`GET /api/v1/farms` or `GET /api/v1/farms?risk=High`

```json
{
  "count": 1,
  "farms": [
    {
      "id": "farm-gamma",
      "name": "Farm Gamma",
      "crop": "Maize",
      "longitude": 75.78,
      "latitude": 30.85,
      "risk": "High",
      "intensity": 1.0,
      "data_status": "illustrative"
    }
  ],
  "data_status": "illustrative",
  "disclaimer": "Illustrative prototype data only..."
}
```

Deck.gl mapping: use `[farm.longitude, farm.latitude]` for `getPosition`. Risk values are exactly `Low`, `Moderate`, `High`.

## 4. Analytics
`GET /api/v1/analytics?crop=Wheat&risk=Low&month=January`

```json
{
  "count": 1,
  "records": [
    {"crop": "Wheat", "risk": "Low", "health": 88, "month": "January", "data_status": "illustrative"}
  ],
  "data_status": "illustrative",
  "disclaimer": "Illustrative prototype data only..."
}
```

All filters are optional. `All` can be omitted or passed as `All`.

## 5. Historical timeline
`GET /api/v1/analytics/timeline`

```json
[
  {
    "month": "January",
    "date": "2026-01-15",
    "average_health": 73.0,
    "monitored_records": 4,
    "low_risk": 2,
    "moderate_risk": 1,
    "high_risk": 1
  }
]
```

## 6. Disease reference
- `GET /api/v1/diseases`
- `GET /api/v1/diseases/wheat-rust`
- Slugs: `wheat-rust`, `rice-blast`, `maize-leaf-blight`, `cotton-leaf-curl`

The payload contains `name`, `crop`, `risk`, `description`, `symptoms[]`, `actions[]`, `prevention[]`, and `data_status=reference_information`.

## 7. CSV report
`GET /api/v1/reports/analytics.csv`

Returns a downloadable CSV file.

## 8. Predictions
`POST /api/v1/predictions`

Request:
```json
{"farm_id": "farm-alpha", "input_type": "hyperspectral_patch"}
```

Returns HTTP 503 with `MODEL_NOT_CONFIGURED` until a trained and validated model is deployed. Frontend should display a neutral “Model not configured” state and must not translate this into “healthy” or “diseased”.

## Frontend setup
Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```
Restart Vite after changing `.env`.

A ready-to-use fetch wrapper is included at `frontend/src/services/api.js`.

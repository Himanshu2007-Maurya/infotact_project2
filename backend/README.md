# TerraSpectra Backend — FastAPI

## Scope
This service provides the Section A backend foundation and a stable API contract for the React/GIS dashboard.

**Current state**
- Health/status endpoint: working.
- Farm marker endpoint: working with illustrative sample farms.
- Dashboard summary and analytics: working with illustrative sample records.
- Timeline, disease reference and CSV report endpoints: working.
- Prediction endpoint: intentionally returns HTTP 503 until a trained and validated model is configured.

Do not describe the sample dashboard values as real observations or model predictions.

## Requirements
Python 3.10+ recommended.

## Run locally (Windows PowerShell)
```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Run locally (macOS/Linux)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Interactive API docs: http://127.0.0.1:8000/docs

## Tests
```bash
python -m pytest -q
```

## Configure frontend CORS
Set `CORS_ORIGINS` in `.env` to the exact frontend origin(s), comma-separated. Vite defaults to `http://localhost:5173`.

## API prefix
All versioned routes use `/api/v1`.

## Endpoints
| Method | Path | Purpose |
|---|---|---|
| GET | `/` | Service root |
| GET | `/api/v1/health` | Backend and model status |
| GET | `/api/v1/dashboard/summary` | Overview cards |
| GET | `/api/v1/farms` | Map markers; optional `?risk=High` |
| GET | `/api/v1/analytics` | Filterable records; `crop`, `risk`, `month` |
| GET | `/api/v1/analytics/timeline` | Monthly timeline aggregates |
| GET | `/api/v1/diseases` | Disease reference list; optional `?crop=Wheat` |
| GET | `/api/v1/diseases/{slug}` | Disease reference details |
| GET | `/api/v1/reports/analytics.csv` | CSV download |
| POST | `/api/v1/predictions` | Reserved inference contract; 503 until model is configured |

## Prediction endpoint behavior
Request:
```json
{"farm_id": "farm-alpha", "input_type": "hyperspectral_patch", "note": "optional"}
```
Until the trained model is available, response is HTTP 503:
```json
{
  "detail": {
    "code": "MODEL_NOT_CONFIGURED",
    "message": "Prediction is unavailable because no trained and validated inference model is configured.",
    "model_status": "not_configured",
    "next_step": "Train and validate the model, export a supported checkpoint, then configure MODEL_PATH."
  }
}
```
This is deliberate: the repository currently has no validated disease-labelled checkpoint. The endpoint must not manufacture a disease score.

## Data provenance
Sample farms and monthly crop analytics are explicitly marked `illustrative`. Disease descriptions are reference content, not diagnoses. Replace these fixtures with validated data as soon as it becomes available.

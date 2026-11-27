# TerraSpectra — Section A Backend Package

This package adds the FastAPI backend and frontend API handoff files to the existing TerraSpectra repository.

## Included
- `backend/`: FastAPI application, typed response schemas, explicit sample data, tests and setup.
- `frontend/src/services/api.js`: frontend fetch client.
- `frontend/.env.example`: Vite API URL configuration.
- `docs/API_CONTRACT.md`: endpoint paths, methods, payload formats and response examples.
- `docs/FRONTEND_HANDOFF.md`: integration instructions for the GIS/frontend teammate.

## Quick start
See `backend/README.md`. The API docs are available at `/docs`.

## Honesty about current ML status
This repository currently contains no trained and validated disease-labelled model. The dashboard and farm fixtures are illustrative. The prediction endpoint deliberately returns HTTP 503 until a valid model is integrated. Do not claim real disease predictions from sample fixtures.

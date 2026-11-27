# Frontend handoff checklist

1. Start FastAPI on `http://127.0.0.1:8000`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Restart the Vite dev server.
4. Import the helper:
   ```js
   import { api } from "./services/api";
   ```
5. Replace hardcoded data in stages:
   - Overview cards: `api.dashboardSummary()`
   - Map points: `api.farms()`; map `[longitude, latitude]`
   - Analytics filters: `api.analytics({ crop, risk })`
   - Timeline slider: `api.timeline({ crop, risk })`
   - Disease panel: `api.diseases()` and `api.disease(slug)`
   - CSV button: navigate to `api.reportCsvUrl`
6. Show a visible “Illustrative sample data” note when `data_status === "illustrative"`.
7. If prediction call returns 503 `MODEL_NOT_CONFIGURED`, show “ML model not configured yet”; do not show a disease label or risk score.

## Example map fetch
```js
const result = await api.farms();
const layerData = result.farms.map((farm) => ({
  ...farm,
  coordinates: [farm.longitude, farm.latitude],
}));
```

## Example API health check
```js
const status = await api.health();
console.log(status.status, status.model_status);
```

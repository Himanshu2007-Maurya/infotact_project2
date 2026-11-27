from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["model_status"] == "not_configured"

def test_farms_and_filter():
    response = client.get("/api/v1/farms")
    assert response.status_code == 200
    assert response.json()["count"] == 3
    high = client.get("/api/v1/farms?risk=High")
    assert high.status_code == 200
    assert high.json()["count"] == 1

def test_analytics_filter():
    response = client.get("/api/v1/analytics?crop=Wheat")
    assert response.status_code == 200
    assert response.json()["count"] == 3
    assert all(row["crop"] == "Wheat" for row in response.json()["records"])

def test_timeline():
    response = client.get("/api/v1/analytics/timeline")
    assert response.status_code == 200
    assert len(response.json()) == 3
    assert response.json()[0]["month"] == "January"

def test_disease_reference():
    response = client.get("/api/v1/diseases/wheat-rust")
    assert response.status_code == 200
    assert response.json()["name"] == "Wheat Rust"

def test_unknown_disease():
    assert client.get("/api/v1/diseases/not-a-disease").status_code == 404

def test_csv_report():
    response = client.get("/api/v1/reports/analytics.csv")
    assert response.status_code == 200
    assert "text/csv" in response.headers["content-type"]
    assert "crop,risk,health,month,data_status" in response.text

def test_prediction_fails_closed_without_model():
    response = client.post("/api/v1/predictions", json={"farm_id": "farm-alpha"})
    assert response.status_code == 503
    assert response.json()["detail"]["code"] == "MODEL_NOT_CONFIGURED"

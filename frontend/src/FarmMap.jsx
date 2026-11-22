
import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { Map } from "react-map-gl/maplibre";

import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

const INITIAL_VIEW_STATE = {
  longitude: 75.85,
  latitude: 30.90,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const farmLocations = [
  {
    name: "Farm Alpha",
    coordinates: [75.85, 30.90],
    risk: "Low",
    color: [34, 197, 94],
    intensity: 0.2,
  },
  {
    name: "Farm Beta",
    coordinates: [75.92, 30.95],
    risk: "Moderate",
    color: [245, 158, 11],
    intensity: 0.6,
  },
  {
    name: "Farm Gamma",
    coordinates: [75.78, 30.85],
    risk: "High",
    color: [239, 68, 68],
    intensity: 1,
  },
];

function FarmMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const [visibleRisks, setVisibleRisks] = useState({
    Low: true,
    Moderate: true,
    High: true,
  });

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const visibleFarms = useMemo(
    () => farmLocations.filter((farm) => visibleRisks[farm.risk]),
    [visibleRisks]
  );

  const toggleRisk = (risk) => {
    setVisibleRisks((previous) => ({
      ...previous,
      [risk]: !previous[risk],
    }));

    if (selectedFarm?.risk === risk) {
      setSelectedFarm(null);
    }
  };

  const layers = useMemo(() => {
    const mapLayers = [];

    if (showHeatmap) {
      mapLayers.push(
        new HeatmapLayer({
          id: "farm-risk-heatmap",
          data: visibleFarms,
          getPosition: (farm) => farm.coordinates,
          getWeight: (farm) => farm.intensity,
          radiusPixels: 65,
          intensity: 1,
          threshold: 0.03,
          opacity: 0.45,
        })
      );
    }

    mapLayers.push(
      new ScatterplotLayer({
        id: "farm-markers",
        data: visibleFarms,
        getPosition: (farm) => farm.coordinates,
        getFillColor: (farm) => farm.color,
        getRadius: 350,
        radiusMinPixels: 9,
        radiusMaxPixels: 20,
        pickable: true,
        stroked: true,
        getLineColor: [255, 255, 255],
        lineWidthMinPixels: 2,
      })
    );

    return mapLayers;
  }, [visibleFarms, showHeatmap]);

  const zoomIn = () => {
    setViewState((previous) => ({
      ...previous,
      zoom: Math.min(previous.zoom + 1, 18),
    }));
  };

  const zoomOut = () => {
    setViewState((previous) => ({
      ...previous,
      zoom: Math.max(previous.zoom - 1, 2),
    }));
  };

  const resetView = () => {
    setViewState({ ...INITIAL_VIEW_STATE });
    setSelectedFarm(null);
  };

  const handleMapClick = (info) => {
    if (info?.object) {
      setSelectedFarm(info.object);
    } else {
      setSelectedFarm(null);
    }
  };

  return (
    <div className="farm-map-widget">

      <div className="map-layer-panel">
        <div className="map-panel-heading">
          <strong>Map Layers</strong>
          <span>Layer Controls</span>
        </div>

        <label className="map-layer-option">
          <input
            type="checkbox"
            checked={visibleRisks.Low}
            onChange={() => toggleRisk("Low")}
          />
          <span className="risk-dot low-dot"></span>
          Low Risk
        </label>

        <label className="map-layer-option">
          <input
            type="checkbox"
            checked={visibleRisks.Moderate}
            onChange={() => toggleRisk("Moderate")}
          />
          <span className="risk-dot moderate-dot"></span>
          Moderate Risk
        </label>

        <label className="map-layer-option">
          <input
            type="checkbox"
            checked={visibleRisks.High}
            onChange={() => toggleRisk("High")}
          />
          <span className="risk-dot high-dot"></span>
          High Risk
        </label>

        <div className="map-panel-divider"></div>

        <label className="map-layer-option heatmap-option">
          <input
            type="checkbox"
            checked={showHeatmap}
            onChange={(event) => setShowHeatmap(event.target.checked)}
          />
          <span>🌡️</span>
          Heatmap Overlay
        </label>
      </div>

      <div className="farm-map-container">

        <Map
          {...viewState}
          onMove={(event) => setViewState(event.viewState)}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: "100%", height: "420px" }}
        />

        <DeckGL
          viewState={viewState}
          controller={false}
          layers={layers}
          onClick={handleMapClick}
          getCursor={({ isHovering }) =>
            isHovering ? "pointer" : "grab"
          }
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
        />

        <div className="map-controls">
          <button onClick={zoomIn} title="Zoom In">+</button>
          <button onClick={zoomOut} title="Zoom Out">−</button>
          <button onClick={resetView} title="Reset Map View">⌂</button>
        </div>

        <div className="map-coordinates">
          Zoom: {viewState.zoom.toFixed(1)}x
        </div>

        {showHeatmap && (
          <div className="heatmap-label">
            Sample Heatmap · Illustrative Only
          </div>
        )}

        {selectedFarm && (
          <div className="farm-info-panel">
            <button
              className="farm-info-close"
              onClick={() => setSelectedFarm(null)}
              title="Close farm information"
            >
              ×
            </button>

            <span className="section-tag">SELECTED FARM</span>
            <h4>{selectedFarm.name}</h4>

            <p>
              <strong>Risk Level:</strong>{" "}
              <span className={`risk-text ${selectedFarm.risk.toLowerCase()}`}>
                {selectedFarm.risk}
              </span>
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {selectedFarm.coordinates[0].toFixed(4)}
            </p>

            <p>
              <strong>Latitude:</strong>{" "}
              {selectedFarm.coordinates[1].toFixed(4)}
            </p>

            <p className="farm-info-note">
              Illustrative sample farm information.
            </p>
          </div>
        )}
      </div>

      <div className="map-legend day8-map-legend">
        <span><i className="legend-dot low-dot"></i> Low Risk</span>
        <span><i className="legend-dot moderate-dot"></i> Moderate Risk</span>
        <span><i className="legend-dot high-dot"></i> High Risk</span>
      </div>

      <p className="sample-data-warning">
        Note: Farm locations, risk levels and heatmap use illustrative
        sample data. They do not represent actual disease predictions.
      </p>

    </div>
  );
}

export default FarmMap;





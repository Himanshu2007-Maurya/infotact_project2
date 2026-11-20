
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

  const toggleRisk = (risk) => {
    setVisibleRisks((previous) => ({
      ...previous,
      [risk]: !previous[risk],
    }));
  };

  const layers = useMemo(() => {
    const visibleFarms = farmLocations.filter(
      (farm) => visibleRisks[farm.risk]
    );

    const mapLayers = [
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
      }),
    ];

    if (showHeatmap) {
      mapLayers.unshift(
        new HeatmapLayer({
          id: "farm-risk-heatmap",
          data: farmLocations,
          getPosition: (farm) => farm.coordinates,
          getWeight: (farm) => farm.intensity,
          radiusPixels: 65,
          intensity: 1,
          threshold: 0.03,
          opacity: 0.45,
        })
      );
    }

    return mapLayers;
  }, [visibleRisks, showHeatmap]);

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
  };

  return (
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
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
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

      <div className="heatmap-label">
        Sample Heatmap
      </div>
    </div>
  );
}

export default FarmMap;




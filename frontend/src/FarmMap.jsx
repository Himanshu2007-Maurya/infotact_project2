import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/maplibre";

import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

// Configure MapLibre worker for Vite
setWorkerUrl(workerUrl);

const farmLocations = [
  {
    name: "Farm Alpha",
    coordinates: [75.85, 30.90],
    risk: "Low",
    color: [34, 197, 94],
  },
  {
    name: "Farm Beta",
    coordinates: [75.92, 30.95],
    risk: "Moderate",
    color: [245, 158, 11],
  },
  {
    name: "Farm Gamma",
    coordinates: [75.78, 30.85],
    risk: "High",
    color: [239, 68, 68],
  },
];

function FarmMap() {
  const [viewState, setViewState] = useState({
    longitude: 75.85,
    latitude: 30.90,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  });

  const layers = useMemo(
    () => [
      new ScatterplotLayer({
        id: "farm-markers",
        data: farmLocations,
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
    ],
    []
  );

  return (
    <div className="farm-map-container">
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{
          width: "100%",
          height: "420px",
        }}
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
    </div>
  );
}

export default FarmMap;



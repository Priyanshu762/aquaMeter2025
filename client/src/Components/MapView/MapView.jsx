import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import geojsonData from "../../Data/stationData/geojsonData";

// Custom marker icon (you can customize this further if needed)
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Function to style markers based on their status
const pointToLayer = (feature, latlng) => {
  let color;
  switch (feature.properties.status) {
    case "Safe":
      color = "green";
      break;
    case "Moderate":
      color = "yellow";
      break;
    case "Polluted":
      color = "red";
      break;
    default:
      color = "blue";
  }
  return L.circleMarker(latlng, {
    radius: 8,
    fillColor: color,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  });
};

const MapView = ({ onMarkerClick }) => {
  return (
    <div className="flex justify-center md:justify-start shadow-2xl w-full md:h-[50vh] md:w-[55vw]">
      <MapContainer
        center={[25.2678, 83.0173]}
        zoom={12}
        scrollWheelZoom={true}
        className="rounded-lg overflow-hidden"
        style={{ height: "50vh", width: "50vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={geojsonData}
          pointToLayer={pointToLayer}
          onEachFeature={(feature, layer) => {
            // When marker is clicked, call the parent callback with this marker's properties
            layer.on("click", () => {
              onMarkerClick(feature.properties);
            });
            // Bind a popup for visual feedback on the map
            layer.bindPopup(`<b>${feature.properties.name}</b><br>Status: ${feature.properties.status}`);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;

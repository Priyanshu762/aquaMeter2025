import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import geojsonData from "../../Data/stationData/geojsonData";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

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

// Custom Component to handle map centering
const RecenterMap = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 15, { animate: true });
    }
  }, [coordinates, map]);

  return null;
};

const MapView = ({ onMarkerClick, deviceData }) => {
  console.log("Selected Device coor in MapView: ", deviceData.coordinates);

  return (
    <div className="flex justify-center md:justify-start shadow-2xl w-full md:h-[40vh] md:w-[55vw]">
      <MapContainer
        center={deviceData?.coordinates || [83.0373, 25.2878]} // Default coordinates
        zoom={8}
        scrollWheelZoom={true}
        className="rounded-xl overflow-hidden"
        style={{ height: "40vh", width: "55vw" }}
      >
        {/* Recenter the map when coordinates change */}
        <RecenterMap coordinates={deviceData?.coordinates} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={geojsonData}
          pointToLayer={pointToLayer}
          onEachFeature={(feature, layer) => {
            layer.on("click", () => {
              onMarkerClick(feature.properties);
            });

            layer.bindPopup(
              `<b>${feature.properties.name}</b><br>Status: ${feature.properties.status}`
            );
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;

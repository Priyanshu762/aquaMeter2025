const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Station 1",
        status: "Safe",
        deviceId: "DEV001",
        bod: 1.2,
        do: 8.0,
        ph: 7.0,
        temp: 25,
        turbidity: 2,
        timestamp: "2025-03-17T12:30:00Z",
        coordinates: [25.2678, 83.0173]
      },
      geometry: {
        type: "Point",
        coordinates: [83.0173, 25.2678]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Station 2",
        status: "Moderate",
        deviceId: "DEV002",
        bod: 4.0,
        do: 5.5,
        ph: 6.8,
        temp: 30,
        turbidity: 5,
        timestamp: "2025-03-17T13:00:00Z",
        coordinates: [25.2778, 83.0273]
      },
      geometry: {
        type: "Point",
        coordinates: [83.0273, 25.2778]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Station 3",
        status: "Polluted",
        deviceId: "DEV003",
        bod: 7.5,
        do: 2.0,
        ph: 9.0,
        temp: 35,
        turbidity: 10,
        timestamp: "2025-03-17T13:30:00Z",
        coordinates: [25.2878, 83.0373]
      },
      geometry: {
        type: "Point",
        coordinates: [83.0373, 25.2878]
      }
    }
  ]
};

export default geojsonData;

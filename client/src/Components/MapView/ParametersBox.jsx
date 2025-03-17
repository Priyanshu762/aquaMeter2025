import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Define acceptable parameter ranges
const PARAMETER_RANGES = {
  bod: { min: 1, max: 3 },
  do: { min: 4, max: 8 },
  ph: { min: 6.5, max: 8.5 },
  temp: { min: 10, max: 30 },
  turbidity: { min: 0, max: 5 },
};

// Utility function to return appropriate icon & color based on value
const getIndicator = (value, param) => {
  if (value === undefined || value === "N/A") return null;
  const { min, max } = PARAMETER_RANGES[param] || {};
  const isSafe = value >= min && value <= max;
  return isSafe ? <FaThumbsUp className="text-green-500" /> : <FaThumbsDown className="text-red-500" />;
};

const ParametersBox = ({ data }) => {
  if (!data) {
    return <div className="text-center p-4">Click a marker to view details.</div>;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white p-6 w-full rounded-xl shadow-xl">
      {/* Location Section */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <SlLocationPin className="text-xl" />
        <p className="font-bold text-lg">{data.name || "Unknown Location"}</p>
      </div>
      <hr className="border-gray-300 dark:border-gray-700 my-2" />

      {/* Device Info */}
      <div className="flex justify-between text-sm mb-3 mx-2">
        <p><span className="font-semibold">Device ID:</span> {data.deviceId || "N/A"}</p>
        <p><span className="font-semibold">Timestamp:</span> {data.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A"}</p>
      </div>
      <hr className="border-gray-300 dark:border-gray-700 my-2" />

      {/* Data Grid */}
      <div className="grid gap-3">
        {[
            { label: "Biochemical Oxygen Demand (mg/L)", key: "bod" },
            { label: "Dissolved Oxygen (mg/L)", key: "do" },
            { label: "pH Level", key: "ph" },
            { label: "Water Temperature (°C)", key: "temp" },
            { label: "Water Turbidity", key: "turbidity" },
        ].map(({ label, key }) => (
            <div
            key={key}
            className="grid grid-cols-[1.5fr_1fr_0.5fr] items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
            <span className="text-left">{label}:</span>
            <span className="font-medium text-center">{data[key] || "N/A"}</span>
            <span className="flex justify-center">{getIndicator(data[key], key)}</span>
            </div>
        ))}
      </div>

    </div>
  );
};

export default ParametersBox;

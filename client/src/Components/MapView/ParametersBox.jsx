import React, { useEffect, useRef, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { FaThumbsUp, FaThumbsDown, FaPlay, FaPause, FaArrowCircleRight, FaArrowCircleLeft  } from "react-icons/fa";

const PARAMETER_RANGES = {
  bod: { min: 1, max: 3 },
  do: { min: 4, max: 8 },
  ph: { min: 6.5, max: 8.5 },
  temp: { min: 10, max: 30 },
  turbidity: { min: 0, max: 5 },
};

const getIndicator = (value, param) => {
  if (value === undefined || value === "N/A") return null;
  const { min, max } = PARAMETER_RANGES[param] || {};
  return value >= min && value <= max ? <FaThumbsUp className="text-green-500" /> : <FaThumbsDown className="text-red-500" />;
};

const ParametersBox = ({ data, onNext, onPrevious, progress, setProgress }) => {
  if (!data) {
    return <div className="text-center p-4">Click a marker to view details.</div>;
  }

  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        onNext(); // Move to the next item
                        return 0; // Reset progress
                    }
                    return prev + 1;
                });
            }, 50);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
  };

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white p-6 w-full rounded-xl shadow-xl">
      
      <div className="flex items-center gap-8 mb-4 w-full">
        
        <div className="flex gap-8 justify-between w-full">
          <button onClick={onPrevious} className="cursor-pointer">
            <FaArrowCircleLeft size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={handlePlayPause}>
            <SlLocationPin className="text-xl" />
            <p className="font-bold text-lg">{data.name || "Unknown Location"}</p>
          </div>
          <button onClick={onNext} className="cursor-pointer">
            <FaArrowCircleRight size={24} />
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 overflow-hidden mb-4">
        <div className="bg-blue-600 h-full rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex justify-between text-sm mb-3">
        <p><span className="font-semibold">Device ID:</span> {data.deviceId || "N/A"}</p>
        <p><span className="font-semibold">Timestamp:</span> {data.timestamp ? new Date(data.timestamp).toLocaleString() : "N/A"}</p>
      </div>
      <hr className="border-gray-300 dark:border-gray-700 my-2" />

      <div className="grid gap-3">
        {[
          { label: "Biochemical Oxygen Demand (mg/L)", key: "bod" },
          { label: "Dissolved Oxygen (mg/L)", key: "do" },
          { label: "pH Level", key: "ph" },
          { label: "Water Temperature (°C)", key: "temp" },
          { label: "Water Turbidity", key: "turbidity" },
        ].map(({ label, key }) => (
          <div key={key} className="grid grid-cols-[1.5fr_1fr_0.5fr] items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
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

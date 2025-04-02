import React, { useEffect, useState } from "react";

const STATUS_COLORS = {
  Safe: "bg-green-500",
  Moderate: "bg-yellow-500",
  Polluted: "bg-red-500",
  Unknown: "bg-gray-400",
};

export const fetchDeviceHistory = async (deviceId) => {
  const fakeData = Array.from({ length: 30 }, (_, i) => {
    const statusOptions = ["Safe", "Moderate", "Polluted"];
    return {
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      status: statusOptions[Math.floor(Math.random() * 3)],
      bod: (Math.random() * 5).toFixed(2),
      do: (Math.random() * 10).toFixed(2),
      ph: (6 + Math.random() * 2).toFixed(1),
      temp: (15 + Math.random() * 10).toFixed(1),
      turbidity: (Math.random() * 10).toFixed(2),
    };
  });

  return new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000));
};

const DeviceHeatmap = ({ deviceId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!deviceId) return;
    fetchDeviceHistory(deviceId).then((data) => {
      setHistory(data.reverse());
    });
  }, [deviceId]);

  if (!deviceId) {
    return <div className="text-center p-4">Select a device to view heatmap.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[55vw] mx-auto overflow-visible ">
      <h2 className="text-lg font-semibold text-center mb-4">📊 Last 30 Days Heatmap</h2>

      <div className="grid grid-cols-6 md:grid-cols-10 gap-3 justify-center relative">
        {history.length > 0 ? (
          history.map((day, index) => {
            const colorClass = STATUS_COLORS[day.status] || STATUS_COLORS.Unknown;
            return (
              <div key={index} className="relative group flex flex-col items-center">
                
                <div className="absolute hidden group-hover:flex flex-col items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs rounded-lg p-2 bottom-full mb-2 w-48 text-center shadow-lg border dark:border-gray-700 z-50 transition-opacity duration-300">
                  <p className="font-bold">{day.date}</p>
                  <hr className="my-1 border-gray-400 dark:border-gray-500"/>
                  <p><span className="font-semibold">Status:</span> {day.status}</p>
                  <p><span className="font-semibold">BOD:</span> {day.bod} mg/L</p>
                  <p><span className="font-semibold">DO:</span> {day.do} mg/L</p>
                  <p><span className="font-semibold">pH:</span> {day.ph}</p>
                  <p><span className="font-semibold">Temp:</span> {day.temp}°C</p>
                  <p><span className="font-semibold">Turbidity:</span> {day.turbidity}</p>
                </div>

                <div
                  className={`w-8 h-8 rounded-md ${colorClass} shadow-md transition-transform duration-200 hover:scale-110`}
                />

                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
                  {day.date.split('/').slice(0, 2).join('/')}
                </p>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DeviceHeatmap;

import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import AddDeviceModal from "./AddDeviceModal";

const DevicesDataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return data.filter((device) =>
      Object.values(device).some((value) =>
        String(value).toLowerCase().includes(normalizedSearchTerm)
      )
    );
  }, [data, searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  if (!data || data.length === 0) {
    return <p className="text-gray-500 dark:text-gray-300">No device data available.</p>;
  }

  return (
    <div className="space-y-4 mt-16 mb-16">
      <div className="flex justify-between items-center w-[80vw] mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">💧 Devices</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow"
          >
            Register Device
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[75vh] w-[80vw] mx-auto custom-scrollbar rounded-md border border-gray-200 dark:border-gray-700 shadow-inner">
        <table className="min-w-[1200px] w-full text-sm text-left bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
          <thead className="dark:bg-indigo-700 bg-gray-700 text-white sticky top-0 z-10 text-left">
            <tr>
              <th className="px-4 py-3">Device ID</th>
              <th className="px-4 py-3">pH</th>
              <th className="px-4 py-3">Turbidity</th>
              <th className="px-4 py-3">Temp (°C)</th>
              <th className="px-4 py-3">TDS</th>
              <th className="px-4 py-3">Depth</th>
              <th className="px-4 py-3">WQI</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((device) => (
              <tr
                key={device._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{device.deviceId}</td>
                <td className="px-4 py-2">{device.phLevel}</td>
                <td className="px-4 py-2">{device.turbidity}</td>
                <td className="px-4 py-2">{device.temperature}</td>
                <td className="px-4 py-2">{device.dissolvedOxygen}</td>
                <td className="px-4 py-2">{device.depth}</td>
                <td className="px-4 py-2">{device.wqi}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(device.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddDeviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DevicesDataTable;

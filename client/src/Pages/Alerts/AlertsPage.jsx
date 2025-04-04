import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import { MdOutlineWarningAmber } from "react-icons/md";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleAlerts = [
  { deviceId: "D-001", location: "Yamuna River", parameter: "pH Level", value: 9.2, status: "Critical", timestamp: new Date().toISOString() },
  { deviceId: "D-002", location: "Ganges", parameter: "Turbidity", value: 55, status: "Warning", timestamp: new Date().toISOString() },
  { deviceId: "D-003", location: "Delhi Canal", parameter: "BOD", value: 30, status: "Normal", timestamp: new Date().toISOString() },
  { deviceId: "D-004", location: "Delhi Canal", parameter: "BOD", value: 30, status: "Warning", timestamp: new Date().toISOString() },
  { deviceId: "D-005", location: "Delhi Canal", parameter: "BOD", value: 30, status: "Warning", timestamp: new Date().toISOString() },
  { deviceId: "D-006", location: "Delhi Canal", parameter: "BOD", value: 30, status: "Critical", timestamp: new Date().toISOString() },
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(sampleAlerts);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/alerts"); // Replace with actual API
      setAlerts(Array.isArray(response.data) ? response.data : sampleAlerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setAlerts(sampleAlerts);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Critical":
        return <FaExclamationTriangle className="text-red-600 text-lg" />;
      case "Warning":
        return <MdOutlineWarningAmber className="text-yellow-500 text-lg" />;
      default:
        return <FaCheckCircle className="text-green-500 text-lg" />;
    }
  };

  const filteredAlerts = alerts.filter((alert) =>
    (filter === "all" || alert.status === filter) &&
    (alert.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      alert.location.toLowerCase().includes(search.toLowerCase()))
  );

  const alertTrendData = alerts.map((alert, index) => ({
    name: new Date(alert.timestamp).toLocaleTimeString(),
    value: index + 1,
  }));

  return (
    <div className="p-6 min-h-screen text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        🚨 Water Quality Alerts
        <button onClick={fetchAlerts} className="ml-auto p-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-400">
          <FaSyncAlt className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Device ID or Location..."
          className="p-3 w-full border rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Alerts</option>
          <option value="Critical">Critical</option>
          <option value="Warning">Warning</option>
          <option value="Normal">Normal</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg h-100 scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white">
              <th className="p-4">Device ID</th>
              <th className="p-4">Location</th>
              <th className="p-4">Parameter</th>
              <th className="p-4">Value</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-4">{alert.deviceId}</td>
                  <td className="p-4">{alert.location}</td>
                  <td className="p-4">{alert.parameter}</td>
                  <td className="p-4">{alert.value}</td>
                  <td className="p-4 flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span>{alert.status}</span>
                  </td>
                  <td className="p-4">{new Date(alert.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsPage;
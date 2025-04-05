import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDownload, FaTemperatureHigh, FaFlask, FaWater } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import AnalyticsStatCard from './AnalyticsStatCard';

const Analytics = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceOptions, setDeviceOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sih-2024-qyug.onrender.com/api/sensor-data');
        const sorted = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setDeviceData(sorted);
        const uniqueDevices = [...new Set(sorted.map((item) => item.deviceId))];
        setDeviceOptions(uniqueDevices);
        setSelectedDevice(uniqueDevices[0]);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
      }
    };
    fetchData();
  }, []);

  const filtered = deviceData.filter((item) => item.deviceId === selectedDevice);
  const latestEntry = filtered[filtered.length - 1];

  const deviceInfo = latestEntry
    ? {
        name: latestEntry.name || `Device ${latestEntry.deviceId}`,
        location: latestEntry.location || [0, 0],
        timestamp: latestEntry.timestamp,
      }
    : null;

  const calculateStats = (key) => {
    const values = filtered.map((d) => d[key]);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length) || 0;
    return {
      avg: avg.toFixed(2),
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const handleDownloadReport = () => {
    const csvHeader = 'Timestamp,Temperature,pH,Turbidity\n';
    const csvRows = filtered
      .map(
        (row) =>
          `${new Date(row.timestamp).toLocaleString()},${row.temperature},${row.phLevel},${row.turbidity}`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_${selectedDevice}_${Date.now()}.csv`;
    link.click();
  };

  const stats = {
    temperature: calculateStats('temperature'),
    phLevel: calculateStats('phLevel'),
    turbidity: calculateStats('turbidity'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
        📊 Analytics Dashboard
      </h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
        <div className="flex-1 space-y-1">
          {deviceInfo && (
            <>
              <p className="dark:text-indigo-200 text-indigo-600 font-bold text-base">{deviceInfo.name}</p>
              <p><strong>Device ID:</strong> {selectedDevice}</p>
              <p><strong>Location:</strong> Lat {deviceInfo.location[1]}, Lon {deviceInfo.location[0]}</p>
              <p><strong>Last Updated:</strong> {new Date(deviceInfo.timestamp).toLocaleString()}</p>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white w-full sm:w-auto"
          >
            {deviceOptions.map((deviceId) => (
              <option key={deviceId} value={deviceId}>
                Device {deviceId}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
          >
            <FaDownload />
            CSV Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AnalyticsStatCard icon={<FaTemperatureHigh />} name="Temperature" unit="°C" {...stats.temperature} />
        <AnalyticsStatCard icon={<FaFlask />} name="pH Level" unit="pH" {...stats.phLevel} />
        <AnalyticsStatCard icon={<FaWater />} name="Turbidity" unit="NTU" {...stats.turbidity} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="🌡️ Temperature Trend" data={filtered} dataKey="temperature" stroke="#3FA2F6" unit="°C" />

        <ChartCard title="🧪 pH Level Trend" data={filtered} dataKey="phLevel" stroke="#a463f2" unit="" />

        <div className="md:col-span-2">
          <ChartCard title="💧 Turbidity Trend" data={filtered} dataKey="turbidity" stroke="#FF1E00" unit="NTU" />
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ title, data, dataKey, stroke, unit }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
        <YAxis />
        <Tooltip content={<CustomTooltip parameter={dataKey} unit={unit} />} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CustomTooltip = ({ active, payload, label, parameter, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 text-xs shadow">
        <p className="font-semibold">{new Date(label).toLocaleString()}</p>
        <p>{parameter}: {payload[0].value} {unit}</p>
      </div>
    );
  }
  return null;
};

export default Analytics;

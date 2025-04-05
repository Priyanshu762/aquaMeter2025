import React, { useState, useEffect } from "react";

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLogs([
        { id: 1, message: "User Admin logged in", timestamp: "2025-04-04 10:00 AM", type: "info" },
        { id: 2, message: "Failed login attempt from 192.168.1.10", timestamp: "2025-04-04 10:15 AM", type: "warning" },
        { id: 3, message: "User John updated system settings", timestamp: "2025-04-04 11:00 AM", type: "success" },
        { id: 4, message: "Database backup completed", timestamp: "2025-04-04 12:30 PM", type: "info" },
        { id: 5, message: "Server restarted unexpectedly", timestamp: "2025-04-04 01:45 PM", type: "error" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const logTypeStyles = {
    info: "bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-300 border-blue-400 dark:border-blue-600",
    success: "bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-300 border-green-400 dark:border-green-600",
    warning: "bg-yellow-200 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-300 border-yellow-400 dark:border-yellow-600",
    error: "bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-300 border-red-400 dark:border-red-600",
  };

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">System Logs</h2>
      <p className="text-gray-700 dark:text-gray-300 mt-2">View recent system activities and logs here.</p>

      {loading ? (
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <p className="text-gray-600 dark:text-gray-400">No logs available.</p>
        </div>
      ) : (
        <div className="mt-4 max-h-96 overflow-y-auto border-2 dark:border-indigo-300 border-gray-500 rounded-lg p-2 bg-gray-100 dark:bg-gray-800 scrollbar">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-2 mb-2 border-l-4 ${logTypeStyles[log.type]} rounded-md shadow-sm`}
            >
              <p className="text-sm font-medium">{log.message}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{log.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemLogs;
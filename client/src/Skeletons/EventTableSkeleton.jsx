import React from "react";

const EventTableSkeleton = ({ rows = 5 }) => {
  const skeletonRows = Array.from({ length: rows });

  return (
    <div className="overflow-x-auto h-[80vh] scrollbar">
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gradient-to-r from-gray-700 to-gray-500 text-white text-left">
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">Event Name</th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">Date</th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">Time</th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">Location</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr
              key={index}
              className={`border-b border-gray-300 dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-transparent dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              {[...Array(2)].map((_, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">
                  <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTableSkeleton;

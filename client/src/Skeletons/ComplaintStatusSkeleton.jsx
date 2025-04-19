import React from "react";

const ComplaintStatusSkeleton = ({ rows = 4 }) => {
  const skeletonRows = Array.from({ length: rows });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        📌 Complaint Status
      </h2>

      <div className="relative w-full mb-6">
        <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="border p-3 text-left">Complaint ID</th>
              <th className="border p-3 text-left">Issue</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-left">Actions</th>
              <th className="border p-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr
                key={index}
                className="even:bg-gray-50 dark:even:bg-gray-700 text-gray-900 dark:text-white"
              >
                {[...Array(5)].map((_, cellIndex) => (
                  <td key={cellIndex} className="border p-3">
                    <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintStatusSkeleton;

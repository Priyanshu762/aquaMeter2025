import React, { useState } from "react";

const ComplaintStatus = () => {
  const [searchId, setSearchId] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const complaints = [
    {
      id: "12345",
      issue: "Garbage",
      status: "Pending",
      images: ["/images/garbage1.jpg", "/images/garbage2.jpg"],
      actions: "Inspection scheduled."
    },
    {
      id: "67890",
      issue: "Foul Smell",
      status: "In Progress",
      images: ["/images/smell1.jpg"],
      actions: "Investigating source."
    },
    {
      id: "54321",
      issue: "Discoloration",
      status: "Resolved",
      images: ["/images/discoloration.jpg"],
      actions: "Water treatment completed."
    },
  ];

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.id.includes(searchId)
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        📌 Complaint Status
      </h2>
      <input
        type="text"
        placeholder="Enter Complaint ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="w-full border rounded p-2 mb-4 dark:bg-gray-800 dark:text-white"
      />

      

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border p-2">Complaint ID</th>
              <th className="border p-2">Issue</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map(({ id, issue, status, actions, images }) => (
              <>
                <tr key={id} className="text-center border dark:border-gray-600">
                  <td className="border p-2">{id}</td>
                  <td className="border p-2">{issue}</td>
                  <td className={`border p-2 ${getStatusClass(status)}`}>{status}</td>
                  <td className="border p-2">{actions}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setExpandedRow(expandedRow === id ? null : id)}
                    >
                      {expandedRow === id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
                {expandedRow === id && (
                  <tr>
                    <td colSpan={5} className="p-4 bg-gray-100 dark:bg-gray-800">
                      <h3 className="text-lg font-semibold">Complaint Details</h3>
                      <p><strong>Actions Taken:</strong> {actions}</p>
                      <div className="flex gap-2 mt-2">
                        {images.map((img, index) => (
                          <img key={index} src={img} alt="complaint" className="w-20 h-20 object-cover rounded-lg" />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintStatus;
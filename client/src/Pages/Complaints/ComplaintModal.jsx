import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast  } from "react-toastify";

export default function ComplaintModal({ complaint, onClose, onUpdate }) {
  const [status, setStatus] = useState(complaint?.status || "");
  const [action, setAction] = useState(complaint?.action || "");
  const [additionalInfo, setAdditionalInfo] = useState(complaint?.additionalInfo || "");

  useEffect(() => {
    if (complaint) {
      setStatus(complaint?.status || "");
      setAction(complaint?.action || "");
      setAdditionalInfo(complaint?.additionalInfo || "");
    }
  }, [complaint]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const { data } = await axios.patch(
        `http://localhost:8080/api/complaints/${complaint._id}/status`,
        {
          status,
          action,
          additionalInfo,
        },
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true }
      );

      toast.success("Complaint updated successfully");
      
      await onUpdate(data.complaint); 
      onClose();
    } catch (err) {
      toast.error("Failed to update complaint");
      console.error(err);
    }
  };



  if (!complaint) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          >
            <MdClose size={24} />
          </button>

          <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            📝 Complaint Details
          </h2>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>User:</strong> {complaint.createdBy?.name || "Unknown"}</p>
            <p><strong>Location:</strong> {complaint.location}</p>
            <p><strong>Issue:</strong> {complaint.issue}</p>

            <div>
              <label className="block text-sm font-medium mb-1">Update Status:</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-Progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Action Taken:</label>
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Info:</label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

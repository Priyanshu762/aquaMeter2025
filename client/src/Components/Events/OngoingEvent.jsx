import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import ScannerPage from '../../Pages/Attendance/ScannerPage';
import { toast } from "react-toastify";

const OngoingEvent = () => {
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [formData, setFormData] = useState({ isPresent: false, hasCompleted: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get("/api/events/ongoing-events");
        setEvent(response.data);
        if (response.data.participants) {
          setParticipants(response.data.participants);
        }
      } catch (error) {
        console.log("Error in OngoingEvent", error);
      }
    };

    fetchEvent();
  }, []);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setScannedData(parsed);
      } catch (err) {
        console.error("Invalid QR code format");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('/api/events/attendance-mark', {
        ...scannedData,
        ...formData
      });
      toast.success("Attendance marked!");
      setScannedData(null);
      setFormData({ isPresent: false, hasCompleted: false });
      setOpenAttendance(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-200">{event.name}</h2>
        <p className="text-gray-700 dark:text-gray-200">{event.description}</p>
        <div className="text-gray-700 dark:text-gray-300 text-lg flex flex-col gap-1 text-md font-semibold">
          <p>📅 {new Date(event.date).toLocaleDateString()} ⏰ {event.time}</p>
          <p>📍 {event.location}</p>
        </div>

        <button
          onClick={() => setOpenAttendance(true)}
          className="mt-4 bg-blue-800 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm transition"
        >
          {loading ? "Loading..." : "📸 Take Attendance"}
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Participants</h3>
        {participants.length > 0 ? (
          <div className="space-y-3">
            {participants.map((p, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <p className="font-medium text-gray-900 dark:text-white">{p.user.name}</p>
                <p>✅ Present: <span className={p.isPresent ? 'text-green-600' : 'text-red-500'}>{p.isPresent ? 'Yes' : 'No'}</span></p>
                <p>🎓 Completed: <span className={p.hasCompleted ? 'text-green-600' : 'text-red-500'}>{p.hasCompleted ? 'Yes' : 'No'}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No participants yet.</p>
        )}
      </div>

      {/* Attendance Modal */}
      {openAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-center">📷 Scan Participant QR</h3>

            {/* Scanner Component */}
            <div className="w-full rounded-lg border dark:border-gray-700 overflow-hidden">
              <ScannerPage onScan={handleScan} setScannedData={setScannedData} />
            </div>

            {/* Scanned Data Preview & Form */}
            {scannedData && (
              <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-md mt-4">
                <p><b>User ID:</b> {scannedData.userId}</p>
                <p><b>Event ID:</b> {scannedData.eventId}</p>

                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPresent}
                      onChange={(e) => setFormData({ ...formData, isPresent: e.target.checked })}
                    />
                    Present
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.hasCompleted}
                      onChange={(e) => setFormData({ ...formData, hasCompleted: e.target.checked })}
                    />
                    Completed
                  </label>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setOpenAttendance(false);
                  setScannedData(null);
                  setFormData({ isPresent: false, hasCompleted: false });
                }}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              {scannedData && (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingEvent;

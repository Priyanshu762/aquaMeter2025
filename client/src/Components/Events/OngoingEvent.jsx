// import React, { useEffect, useState } from 'react';
// import axios from "../../utils/axios";
// import ScannerPage from '../../Pages/Attendance/ScannerPage';

// const OngoingEvent = () => {
//     const [event, setEvent] = useState({});
//     const [participants, setParticipants] = useState([]);
//     const [openAttendance, setOpenAttendance] = useState(false);
//   useEffect(() => {
//     // Define async function inside useEffect
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get("/api/events/ongoing-events");
//         console.log(response.data);
//         setEvent(response.data);
//         if (response.data.participants) {
//           setParticipants(response.data.participants);  // Set participants here
//         }
//       } catch (error) {
//         console.log("Error in OngoingEvent", error);
//       }
//     };

//     fetchEvent();
//   }, []); // Empty dependency array to run only once

//   return (
//     <div className='w-full'>
//       <p><strong>Event Name:</strong> {event.name}</p>
//       <p><strong>Description:</strong> {event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> {event.time}</p>
//       <p><strong>Location:</strong> {event.location}</p>

//       <h3>Participants:</h3>
//       {participants.length > 0 ? (
//         participants.map((participant) => (
//           <div key={participant._id} className='flex gap-4'>
//             <p><strong>Participant ID:</strong> {participant._id}</p>
//             <p><strong>Participant Name:</strong> {participant.user.name}</p>
//             <p><strong>Present:</strong> {participant.isPresent ? 'Yes' : 'No'}</p>
//             <p><strong>Completed:</strong> {participant.hasCompleted ? 'Yes' : 'No'}</p>
//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No participants yet.</p>
//       )}
//        <button onClick={() => setOpenAttendance(true)}>Take attendance</button> 
//       {openAttendance&&<ScannerPage/>}

// <button className='bg-cyan-600 dark:bg-cyan-700 py-2 px-4 text-white text-sm transition-all shadow-md hover:bg-cyan-700 dark:hover:bg-cyan-800 cursor-pointer rounded-xl'>Mark as Completed</button>
//     </div>
//   );
// };

// export default OngoingEvent;

import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import ScannerPage from '../../Pages/Attendance/ScannerPage';
import {toast} from "react-toastify"
// import { setLoading } from '../../Store/loaderSlice';

const OngoingEvent = () => {
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [formData, setFormData] = useState({ isPresent: false, hasCompleted: false });
  const [loading,setLoading]=useState(false)

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
        console.log("Scanned data",scannedData);
         // { userId, eventId }
      } catch (err) {
        console.error("Invalid QR code format");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('/api/events/attendance-mark', {
        ...scannedData,
        ...formData
      });

    //   alert("Attendance marked!");
    toast.success("Attendance marked!");
      setScannedData(null);
      setFormData({ isPresent: false, hasCompleted: false });
      setOpenAttendance(false);
    } catch (err) {
      console.error("Error marking attendance", err);
      toast.error(err.response.data.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
      <p className="text-gray-700 mb-1">{event.description}</p>
      <p className="text-gray-600">📅 {new Date(event.date).toLocaleDateString()} ⏰ {event.time}</p>
      <p className="text-gray-600 mb-4">📍 {event.location}</p>

      <button
        onClick={() => setOpenAttendance(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
      > {
        loading ? "Loading..." :"Take Attendance"
      }
      </button>

      <h3 className="text-lg font-medium mb-2">Participants:</h3>
      {participants.length > 0 ? (
        participants.map((p, i) => (
          <div key={i} className="p-3 border-b border-gray-200 flex justify-between">
            <p><b>{p.user.name}</b></p>
            <p>✅ Present: {p.isPresent ? 'Yes' : 'No'}</p>
            <p>🎓 Completed: {p.hasCompleted ? 'Yes' : 'No'}</p>
          </div>
        ))
      ) : (
        <p>No participants yet.</p>
      )}

      {openAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 shadow-lg w-[90%] md:w-[500px] relative space-y-4 op">
            <h3 className="text-xl font-semibold text-center mb-4">Scan Participant QR</h3>
            <ScannerPage onScan={handleScan} setScannedData={setScannedData} />

            {scannedData && (
              <div className="bg-red-100 p-3 rounded-md text-black">
                <p><b>User ID:</b> {scannedData.userId}</p>
                <p><b>Event ID:</b> {scannedData.eventId}</p>

                <div className="flex gap-4 mt-2">
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

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setOpenAttendance(false);
                  setScannedData(null);
                  setFormData({ isPresent: false, hasCompleted: false });
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              {scannedData && (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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

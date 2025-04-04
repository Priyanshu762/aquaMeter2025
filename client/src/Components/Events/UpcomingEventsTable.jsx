import React from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEventsTable = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    { id: 1, name: "AWS Cloud Workshop", date: "2025-04-15", time: "10:00 AM", location: "Seminar Hall, University", description: "An in-depth hands-on AWS cloud session." },
    { id: 2, name: "ReactJS Bootcamp", date: "2025-05-02", time: "2:00 PM", location: "Online", description: "Learn React.js with hands-on coding experience." },
  ];

  return (
    <div className="overflow-x-auto h-[80vh] scrollbar">
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-700 to-blue-500 text-white text-left">
            <th className="px-6 py-4 text-lg font-semibold">Event Name</th>
            <th className="px-6 py-4 text-lg font-semibold">Date</th>
            <th className="px-6 py-4 text-lg font-semibold">Time</th>
            <th className="px-6 py-4 text-lg font-semibold">Location</th>
            <th className="px-6 py-4 text-lg font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr
              key={event.id}
              className={`border-b border-gray-300 dark:border-gray-700 ${
                index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
              } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition duration-200`}
            >
              <td className="px-6 py-4 font-medium">{event.name}</td>
              <td className="px-6 py-4">{event.date}</td>
              <td className="px-6 py-4">{event.time}</td>
              <td className="px-6 py-4">{event.location}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="relative inline-block px-6 py-2 font-semibold text-white border-1 border-indigo-500 overflow-hidden group transition-all duration-300 ease-in-out rounded-lg cursor-pointer"
                >
                  <span className="absolute left-0 top-0 w-full h-full bg-violet-400 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300 ease-in-out"></span>
                  <span className="relative z-10">Check Event</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEventsTable;

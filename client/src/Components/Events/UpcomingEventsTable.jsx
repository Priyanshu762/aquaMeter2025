import React from "react";

const UpcomingEventsTable = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "AWS Cloud Workshop",
      date: "2025-04-15",
      time: "10:00 AM",
      location: "Seminar Hall, University",
    },
    {
      id: 2,
      name: "ReactJS Bootcamp",
      date: "2025-05-02",
      time: "2:00 PM",
      location: "Online",
    },
    {
      id: 3,
      name: "ReactJS Bootcamp",
      date: "2025-05-02",
      time: "2:00 PM",
      location: "Online",
    },
    {
      id: 4,
      name: "ReactJS Bootcamp",
      date: "2025-05-02",
      time: "2:00 PM",
      location: "Online",
    },
    {
      id: 5,
      name: "ReactJS Bootcamp",
      date: "2025-05-02",
      time: "2:00 PM",
      location: "Online",
    },
  ];

  return (
    <div className="overflow-x-auto h-[80vh] scrollbar">
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-700 to-blue-500 text-white text-left">
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">
              Event Name
            </th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">
              Date
            </th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">
              Time
            </th>
            <th className="px-6 py-4 text-lg font-semibold border-b border-gray-400 dark:border-gray-600">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr
              key={event.id}
              className={`border-b border-gray-300 dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-transparent dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition duration-200`}
            >
              <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-medium">
                {event.name}
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {event.date}
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {event.time}
              </td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {event.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEventsTable;

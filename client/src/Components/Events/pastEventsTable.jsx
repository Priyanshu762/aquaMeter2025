import React from "react";

const PastEventsTable = () => {
  const pastEvents = [
    {
      id: 1,
      name: "Intro to AWS Cloud",
      date: "2025-02-10",
      time: "11:00 AM",
      location: "Seminar Hall, University",
    },
    {
      id: 2,
      name: "JavaScript Essentials",
      date: "2025-03-05",
      time: "3:00 PM",
      location: "Online",
    },
    {
      id: 3,
      name: "React Advanced Workshop",
      date: "2025-03-20",
      time: "10:30 AM",
      location: "Tech Hub, City Center",
    },
    {
      id: 4,
      name: "Docker & Kubernetes Basics",
      date: "2025-04-01",
      time: "12:00 PM",
      location: "Online",
    },
    {
      id: 5,
      name: "Python for Data Science",
      date: "2025-04-08",
      time: "9:00 AM",
      location: "Lab 3, University",
    },
  ];

  return (
    <div className="overflow-x-auto h-[80vh] scrollbar">
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gradient-to-r from-gray-700 to-gray-500 text-white text-left">
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
          {pastEvents.map((event, index) => (
            <tr
              key={event.id}
              className={`border-b border-gray-300 dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-transparent dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200`}
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

export default PastEventsTable;

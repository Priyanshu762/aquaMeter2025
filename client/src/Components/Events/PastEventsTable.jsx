import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import EventTableSkeleton from "../../Skeletons/EventTableSkeleton";

const PastEventsTable = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDatesInArray = (dataArray, dateKey = "date") => {
    return dataArray.map(item => {
      const newItem = { ...item };
      if (newItem[dateKey]) {
        const date = new Date(newItem[dateKey]);
        newItem[dateKey] = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
      return newItem;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/past-events');
        const formattedData = formatDatesInArray(response.data);
        setPastEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <EventTableSkeleton rows={4} />;
  }

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
          {pastEvents.map((event, index) => (
            <tr
              key={event._id || index}
              className={`border-b border-gray-300 dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-transparent dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200`}
            >
              <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-medium">{event.name}</td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{event.date}</td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{event.time}</td>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastEventsTable;

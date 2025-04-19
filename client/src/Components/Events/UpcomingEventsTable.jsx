import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import EventTableSkeleton from "../../Skeletons/EventTableSkeleton";

const UpcomingEventsTable = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = React.useState([])
  const formatDatesInArray=(dataArray, dateKey = "date")=> {
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
  }
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/upcoming-events')
        const formattedData= formatDatesInArray(response.data);
        setUpcomingEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }finally{
        setLoading(false);
      }
    }
    fetchEvents();
  }, [])
  console.log("Events list:", upcomingEvents);

  if (loading) {
    return <EventTableSkeleton rows={4} />;
  }
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
                  className="relative inline-block px-6 py-2 font-semibold text-white border-1 border-violet-500 overflow-hidden group transition-all duration-300 ease-in-out rounded-lg cursor-pointer"
                >
                  <span className="absolute left-0 top-0 w-full h-full bg-violet-400 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300 ease-in-out"></span>
                  <span className="relative text-gray-800 dark:text-gray-100">Check Event</span>
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import EventTableSkeleton from "../../Skeletons/EventTableSkeleton";
import { MdDelete, MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";

// Modal Component
const UpdateEventModal = ({ isOpen, onClose, eventData, onUpdate }) => {
  const [formData, setFormData] = useState(eventData || {});

  useEffect(() => {
    if (eventData) setFormData(eventData);
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.put(`/api/events/${formData._id}`, formData);
      console.log("Response from update:", response);
      
      toast.success("Event updated!");
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Failed to update event.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit}>
          {["name", "date", "time", "location", "description"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-gray-700 dark:text-gray-300 capitalize"
              >
                {field}
              </label>
              {field !== "description" ? (
                <input
                  type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                ></textarea>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Table Component
const UpcomingEventsTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const formatDatesInArray = (dataArray, dateKey = "date") => {
    return dataArray.map((item) => {
      const newItem = { ...item };
      if (newItem[dateKey]) {
        const date = new Date(newItem[dateKey]);
        newItem[dateKey] = date.toISOString().split("T")[0]; // YYYY-MM-DD for input compatibility
      }
      return newItem;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/upcoming-events");
        const formattedData = formatDatesInArray(response.data);
        setUpcomingEvents(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (event) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      const eventId = event._id;
      await axios.delete(`/api/events/${eventId}`);
      setUpcomingEvents((prev) => prev.filter((e) => e._id !== eventId));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event. Please try again.");
    }
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
  };

  const handleEventUpdate = (updatedEvent) => {
    setUpcomingEvents((prev) =>
      prev.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
    );
  };

  if (loading) return <EventTableSkeleton rows={4} />;

  return (
    <>
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
                key={event._id}
                className={`border-b border-gray-300 dark:border-gray-700 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-white dark:bg-gray-800"
                } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition duration-200`}
              >
                <td className="px-6 py-4 font-medium">{event.name}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.time}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <MdUpdate
                      size={25}
                      className="cursor-pointer hover:scale-110"
                      onClick={() => handleUpdateClick(event)}
                    />
                    <MdDelete
                      size={25}
                      className="cursor-pointer hover:scale-110 hover:text-red-500"
                      onClick={() => handleDelete(event)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <UpdateEventModal
        isOpen={!!selectedEvent}
        eventData={selectedEvent}
        onClose={handleModalClose}
        onUpdate={handleEventUpdate}
      />
    </>
  );
};

export default UpcomingEventsTable;

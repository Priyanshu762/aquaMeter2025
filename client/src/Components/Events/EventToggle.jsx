import React, { useState } from "react";
import UpcomingEventsTable from "./UpcomingEventsTable";
import PastEventsTable from "./PastEventsTable";
import EventFormModal from "./EventFormModal";
import useModal from "../../hooks/useModal";
import { FaPlusCircle } from "react-icons/fa";

const EventToggle = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreateEvent = (data) => {
    console.log("Event Created:", data);
    closeModal();
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <div className="flex justify-between items-center w-full max-w-5xl">
        <div className="flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 shadow-lg">
          <button
            onClick={() => setShowPastEvents(false)}
            className={`px-6 py-2 font-medium uppercase transition-all duration-200 cursor-pointer ${
              !showPastEvents
                ? "bg-indigo-700 text-white"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setShowPastEvents(true)}
            className={`px-6 py-2 font-medium uppercase transition-all duration-200 cursor-pointer ${
              showPastEvents
                ? "bg-indigo-700 text-white"
                : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Past
          </button>
        </div>

        <button
          className="flex px-6 py-2 font-medium uppercase transition-all duration-200 cursor-pointer bg-indigo-700 text-white rounded-lg shadow-md"
          onClick={openModal}
        >
          <span className="mr-2 mt-1">
            <FaPlusCircle size={16} />
          </span>
          <span>Create</span>
        </button>
      </div>

      <div className="mt-6 w-full max-w-5xl">
        {showPastEvents ? <PastEventsTable /> : <UpcomingEventsTable />}
      </div>

      {/* Event Form Modal */}
      <EventFormModal isOpen={isOpen} onClose={closeModal} onSubmit={handleCreateEvent} />
    </div>
  );
};

export default EventToggle;

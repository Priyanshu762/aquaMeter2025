import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import the check icon

const PreviousEventCard = ({ event }) => {
  const handleDownloadCertificate = () => {
    console.log(`Downloading certificate for ${event.title}`);
    window.open(event.certificateUrl, "_blank");
  };

  return (
    <div className="relative flex flex-col bg-gray-100 dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl p-5 w-full md:w-80 transition-all hover:shadow-xl ">
      {/* Improved Badge - Positioned in the image */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full z-20 shadow-md backdrop-blur-md">
        <AiOutlineCheckCircle className="text-lg" /> <span>Attended</span>
      </div>

      {/* Event Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 ">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover  "
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">{event.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{event.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">{event.date}</span>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium px-3 py-1 rounded-full">{event.time}</span>
        <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-medium px-3 py-1 rounded-full">{event.location}</span>
      </div>

      <button 
        className="w-full mt-3 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-all shadow-md cursor-pointer"
        type="button"
        onClick={handleDownloadCertificate}
      >
        🎓 Download Certificate
      </button>
    </div>
  );
};

export default PreviousEventCard;

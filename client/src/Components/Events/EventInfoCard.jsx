import React from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const EventInfoCard = ({ imgUrl, name, description, date, time, location }) => {
  return (
    <div className="p-6 w-[60vw] flex flex-col justify-start gap-6 dark:bg-gray-800 bg-white shadow-xl rounded-lg mt-4 ml-16 border-l-8 border-gray-900 dark:border-gray-100">
      <img
        src={imgUrl}
        alt={name}
        className="w-64 h-64 lg:w-72 lg:h-72  rounded-xl object-cover shadow-md"
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl font-semibold">{description}</p>

        <div className="flex flex-col gap-3 text-lg text-gray-900 dark:text-gray-100">
          <div className="flex items-center gap-3">
            <BsCalendarDateFill className="text-blue-600 dark:text-blue-400 text-xl" />
            <span className="font-semibold" >{date}</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineAccessTimeFilled className="text-green-600 dark:text-green-400 text-xl" />
            <span className="font-semibold">{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot className="text-red-600 dark:text-red-400 text-xl" />
            <span className="font-semibold">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoCard;

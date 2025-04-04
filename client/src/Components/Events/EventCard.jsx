import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  
  const navigate = useNavigate()
  
  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700 rounded-lg w-full md:w-80 z-10">
      <div className="relative p-2.5 h-56 overflow-hidden rounded-xl bg-clip-border">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 dark:text-white text-xl font-semibold">{event.title}</p>
        </div>
        
        <div className='flex justify-between gap-2 mb-2'>
          <p className="text-slate-500 dark:text-gray-300 text-sm mb-1 bg-cyan-100 dark:bg-cyan-900 w-full p-1 pl-2 duration-300 rounded-full hover:scale-110 cursor-pointer text-center">{event.date}</p>
          <p className="text-slate-500 dark:text-gray-300 text-sm mb-1 bg-cyan-100 dark:bg-cyan-900 w-full p-1 pl-2 duration-300 rounded-full hover:scale-110 cursor-pointer text-center">{event.time}</p>
        </div>
        <div>
          <p className="text-slate-500 dark:text-gray-300 text-sm mb-1 bg-cyan-100 dark:bg-cyan-900 w-full p-1 pl-2 duration-300 rounded-full hover:scale-110 cursor-pointer text-center">{event.location}</p>
        </div>
        <p className="text-slate-600 dark:text-gray-300 leading-normal font-light text-sm">{event.description}</p>
        <button onClick={() => navigate(`/event/${event.id}`)} className="rounded-md w-full mt-6 bg-cyan-600 dark:bg-cyan-700 py-2 px-4 text-white text-sm transition-all shadow-md hover:bg-cyan-700 dark:hover:bg-cyan-800 cursor-pointer" type="button">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default EventCard;

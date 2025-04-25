import React from 'react';

const EventCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700 rounded-lg w-full md:w-80 z-10">
      <div className="p-2.5 h-56 bg-slate-200 dark:bg-gray-700 rounded-xl" />
      
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-slate-300 dark:bg-gray-600 rounded w-2/3" />
        
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded-full w-full" />
          <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded-full w-full" />
        </div>

        <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded-full w-full" />

        <div className="h-14 bg-slate-200 dark:bg-gray-700 rounded w-full" />

        <div className="h-10 bg-cyan-300 dark:bg-cyan-800 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;

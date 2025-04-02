import React from 'react';

const DataCard = ({ icon, value, text, unit }) => {
  return (
    <div className='h-36 w-80 rounded-2xl shadow-lg hover:shadow-lg flex justify-between px-4 items-center gap-8 transition-all duration-300 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white border border-1 border-gray-300 dark:border-none'>
      <div className="flex flex-col overflow-hidden cursor-pointer">
        <p className="text-lg ml-4 font-medium">{text}</p>
        <p className="text-5xl font-semibold ml-4">
          {value}<span className="text-lg ml-2">{unit}</span>
        </p>
      </div>
      <div className='text-5xl'>
        {icon}
      </div>
    </div>
  );
}

export default DataCard;
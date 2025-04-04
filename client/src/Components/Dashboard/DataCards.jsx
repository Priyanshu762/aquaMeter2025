import React from 'react';
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const DataCards = ({ icon, value, param, range}) => {
    
    const isInRange = value >= range.min && value <= range.max;

  return (
    <div className='h-36 w-64 rounded-2xl shadow-lg hover:shadow-lg flex justify-between px-4 items-center gap-8 transition-all duration-300 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white border border-1 border-gray-300 dark:border-none hover:scale-105 transition-transform duration-300'>
      <div className="flex flex-col overflow-hidden cursor-pointer justify-center items-start">
        <p className="text-lg ml-4 font-medium ">{param.charAt(0).toUpperCase() + param.slice(1)}</p>
        <p className="text-3xl font-semibold ml-4 mb-2">
          {value ? value?.toFixed(2) : 'N.A.'}<span className="text-3xl ml-2">{value ? range.unit : ''}</span>
        </p>
        <div className={`mt-1 flex flex-wrap items-center ${isInRange ? "dark:text-green-500 text-green-700" : "text-red-600"}`}>
            {isInRange ? <FaThumbsUp className='w-5 h-5' /> : <FaThumbsDown className='w-5 h-5' />}
            <span className='ml-2 text-sm font-medium'>
                {isInRange ? "Within Range" : "Out of Range"}
            </span>
            <span className='ml-7 text-xs font-medium text-gray-700 dark:text-gray-200'>
                {isInRange ? "Looks Good!" : "Looks Bad!"}
            </span>
        </div>
      </div>
      <div className='text-4xl mt-[-70px]'>
        {icon}
      </div>
      
    </div>
  );
}


export default DataCards;
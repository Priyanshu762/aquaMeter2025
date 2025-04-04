import React from 'react';
import ForecastTile from './ForecastTile';
import { TiWeatherStormy } from "react-icons/ti";
const ForecastCard = () => {
  return (
    <div className="w-full max-w-xl h-auto rounded-3xl p-6 flex flex-col gap-4 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white shadow-lg border border-1 border-gray-200 dark:border-none">

      <div className='text-gray-900 dark:text-white text-xl font-semibold'>
        <h3>Today / Week</h3>
      </div>

      <div className='flex justify-between gap-2'>
        
        <div className='flex flex-col gap-2 overflow-x-auto'>
          <div className="w-full h-36 p-2 flex gap-4 
            bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)] dark:text-white border border-1 border-gray-200 dark:border-none rounded-3xl backdrop-blur-lg ">
            <ForecastTile />
            <ForecastTile />
            <ForecastTile />
            <ForecastTile />
          </div>

          <div className="flex justify-between gap-4 w-full p-4 rounded-3xl 
            bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)] dark:text-white border border-1 border-gray-200 dark:border-none">
            <div className='flex flex-col justify-start'>
              <p>Tomorrow</p>
              <div className='flex flex-col gap-2'>
                <h2 className="text-3xl font-bold">14°</h2>
                <p className="text-sm">Thunder Storm</p>
              </div>
            </div>
            <div>
              <span className='text-7xl'><TiWeatherStormy /></span>
            </div>
          </div>
        </div>

        <div className="w-1/3 p-4 rounded-3xl flex flex-col justify-between items-center bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)] dark:text-white border border-1 border-gray-200 dark:border-none">
          
          <p className="text-sm">Sunrise
            <h2 className="text-2xl font-bold">6:45 AM</h2>
          </p>

          <p className="text-sm mt-2">Sunset
            <h2 className="text-2xl font-bold">5:30 PM</h2>
          </p>

          <p className="text-sm mt-2">Length of Day
            <h2 className="text-xl font-bold">10h 23m</h2>
          </p>
        </div>
      </div>

    </div>
  );
}

export default ForecastCard;

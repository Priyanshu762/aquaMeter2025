import React from 'react';
import ForecastTile from './ForecastTile';

const ForecastCard = () => {
  return (
    <div className="w-full max-w-xl h-auto bg-[linear-gradient(90deg,#5936B4_0%,#362A84_100%)] rounded-3xl p-6 flex flex-col gap-4">
     
      <div className='text-white text-xl font-semibold'>
        <h3>Today / Week</h3>
      </div>
    
        <div className='flex justify-between gap-2'>
            
            <div className='flex flex-col gap-2 overflow-x-auto'>
                <div className="w-full h-36 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-3xl p-2 flex gap-4 overflow-x-auto">
                    <ForecastTile />
                    <ForecastTile />
                    <ForecastTile />
                    <ForecastTile />
                </div>
                <div className="w-full p-4 bg-[rgba(255,255,255,0.1)] rounded-3xl items-start text-white">
                    <div className='flex gap-2 justify-between mx-auto p-1'>
                    <p>Tomorrow</p>
                    <div className='flex flex-col gap-2'>
                    <h2 className="text-3xl font-bold">14°</h2>
                    <p className="text-sm">Thunder Storm</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="w-1/3 p-4 bg-[rgba(255,255,255,0.1)] rounded-3xl text-white flex flex-col justify-between items-center p-4">
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

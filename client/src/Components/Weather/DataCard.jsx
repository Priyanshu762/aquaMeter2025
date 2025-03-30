import React from 'react';
import { WiStrongWind } from "react-icons/wi";

const DataCard = ({icon, value, text, unit}) => {
  return (
    <>
    <div className='h-36 w-80 bg-gradient-to-r from-[#5936B4] to-[#362A84] rounded-2xl shadow-md  hover:shadow-lg flex justify-between px-4 items-center gap-8  transition-all duration-300'>
        <div className="flex flex-col overflow-hidden cursor-pointer">
        <p className="text-white text-lg ml-4 font-medium">{text}</p>
        <p className="text-white text-5xl font-semibold ml-4">
            {value}<span className="text-lg ml-2">{unit}</span>
        </p>
        </div>
        <div className='text-5xl '>
        {icon}
        </div>
    </div>
    </>
  );
}

export default DataCard;
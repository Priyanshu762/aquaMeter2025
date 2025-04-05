import React from "react";
import { WiDayCloudy } from "react-icons/wi";

const ForecastTile = () => {
  return (
    <div className="duration-300 font-mono text-gray-900 dark:text-white group cursor-pointer relative overflow-hidden 
      w-24 h-32 bg-gray-100 dark:bg-[#22272B] rounded-3xl p-3 
      hover:w-44 hover:bg-blue-100 dark:hover:bg-[#1E2A3A] shadow-md">

      <h3 className="text-xl text-center mx-auto">Today</h3>

      <div className="gap-4 relative mt-1">
        <WiDayCloudy className="text-4xl transition-transform duration-300 group-hover:scale-110 text-center ml-2" />

        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-xl text-center 
          group-hover:translate-x-5 group-hover:-translate-y-9 group-hover:scale-100">
          26°
        </h4>
      </div>

      <div className="absolute duration-300 -left-32 group-hover:left-3 mt-2 text-xs font-semibold">
        <p>Heavy Raining</p>
        <p>50% humidity</p>
      </div>
    </div>
  );
};

export default ForecastTile;

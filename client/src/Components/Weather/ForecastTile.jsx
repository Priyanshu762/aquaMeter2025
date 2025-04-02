import React from "react";

const ForecastTile = () => {
  return (
    <div className="duration-300 font-mono text-gray-900 dark:text-white group cursor-pointer relative overflow-hidden 
      w-24 h-32 bg-gray-100 dark:bg-[#22272B] rounded-3xl p-3 
      hover:w-46 hover:bg-blue-500 dark:hover:bg-[#0C66E4]">
      
      <h3 className="text-xl text-center mx-auto">Today</h3>
      
      <div className="gap-4 relative">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-12 scale-[100%]">
          <defs>
            <linearGradient id="b" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fbbf24" />
              <stop offset="0.45" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="c" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f3f7fe" />
              <stop offset="0.45" stopColor="#f3f7fe" />
              <stop offset="1" stopColor="#deeafb" />
            </linearGradient>
          </defs>
          <circle cx="19" cy="24" r="5" fill="url(#b)" stroke="#f8af18" strokeWidth="0.5" />
          <path
            d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
            fill="url(#c)" stroke="#e6effc" strokeWidth="0.5"
          />
        </svg>

        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-xl text-center 
          group-hover:translate-x-5 group-hover:-translate-y-10 group-hover:scale-100">
          26°
        </h4>
      </div>

      <div className="absolute duration-300 -left-32 group-hover:left-3">
        <p className="text-xs">Heavy Raining</p>
        <p className="text-xs">50% humidity</p>
      </div>
    </div>
  );
};

export default ForecastTile;

import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import {
  WiDaySunny, WiSmoke, WiDust, WiDayCloudy
} from "react-icons/wi";
import {
  TiWeatherStormy, TiWeatherDownpour, TiWeatherShower
} from "react-icons/ti";
import {
  RiMistLine, RiHazeLine, RiFoggyLine
} from "react-icons/ri";
import { LuCloudSnow } from "react-icons/lu";
import { BsClouds } from "react-icons/bs";

const CurrentWeatherCard = ({ data }) => {
  const currentWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear': return <WiDaySunny />;
      case 'Thunderstorm': return <TiWeatherStormy />;
      case 'Drizzle': return <TiWeatherDownpour />;
      case 'Rain': return <TiWeatherShower />;
      case 'Snow': return <LuCloudSnow />;
      case 'Mist': return <RiMistLine />;
      case 'Smoke': return <WiSmoke />;
      case 'Haze': return <RiHazeLine />;
      case 'Dust': return <WiDust />;
      case 'Fog': return <RiFoggyLine />;
      case 'Clouds': return <BsClouds />;
      case 'Partly Sunny': return <WiDayCloudy />;
      default: return <WiDayCloudy />;
    }
  };

  const date = new Date();
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  const weatherMain = data.weather[0]?.main || 'Clear';

  return (
    <div className="w-full max-w-xl rounded-3xl p-6 flex flex-col gap-4 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 
      dark:from-[#5936B4] dark:to-[#362A84] dark:text-white 
      shadow-lg border border-gray-200 dark:border-none mx-auto">

      {/* Location */}
      <div className="flex items-center gap-2 text-lg sm:text-xl">
        <IoLocationSharp className="text-2xl" />
        <span>Lucknow, Uttar Pradesh</span>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
        {/* Date & Temp */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-3xl sm:text-4xl font-semibold">{day}</p>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-200">{formattedDate}</p>
          </div>
          <div>
            <p className="text-5xl font-bold">{Math.round(data.temp)}&deg;C</p>
            <p className="text-md font-semibold sm:text-md text-gray-600 dark:text-gray-300 mt-3">Feels Like: {Math.round(data.feels_like)}&deg;C</p>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="text-8xl sm:text-9xl">{currentWeatherIcon(weatherMain)}</div>
          <p className="text-xl sm:text-2xl font-semibold mt-2">{weatherMain}</p>
          
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;

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

const CurrentWeatherCard = ({
  location = "Lucknow, Uttar Pradesh",
  temp = 26,
  high = 27,
  low = 10,
  feelsLike = 26,
  weatherType = "Partly Sunny",
  date = new Date()
}) => {

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

  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="w-[35vw] max-w-xl h-auto rounded-3xl p-6 flex flex-col gap-4 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white shadow-lg border border-1 border-gray-200 dark:border-none justify-center">
    
      <div className='flex items-center gap-2 w-[30vw] mt-4'>
        <span className='text-2xl'><IoLocationSharp /></span>
        <span className='text-lg'>{location}</span>
      </div>

      <div className='flex justify-between gap-16 w-full items-center'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-1'>
            <span className='text-5xl font-semibold'>{day}</span>
            <span className='text-xl dark:text-gray-200'>{formattedDate}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-5xl font-semibold'>{temp}&deg;C</span>
            <span className='text-md dark:text-gray-300 mt-1'>High: {high} &nbsp; Low: {low}</span>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-9xl mt-[-60px]'>{currentWeatherIcon(weatherType)}</span>
          <span className='text-2xl text-center font-semibold'>{weatherType}</span>
          <span className='text-md dark:text-gray-300 mt-2 text-center'>Feels Like: {feelsLike}&deg;C</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;

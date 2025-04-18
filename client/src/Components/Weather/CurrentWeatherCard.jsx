import React from 'react';
import { IoLocationSharp, IoRainyOutline } from "react-icons/io5";
import { TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy } from "react-icons/ti";
import { WiDayHaze, WiSmoke, WiDust, WiDaySunny, WiDayCloudy } from "react-icons/wi";
import { RiDrizzleLine, RiMistLine, RiHazeLine, RiFoggyLine } from "react-icons/ri";
import { LuCloudSnow } from "react-icons/lu";
import { BsClouds } from "react-icons/bs";

const CurrentWeatherCard = () => {

  const currentWeather = (weather) => {
        switch (weather) {
            case 'Clear':
                return <WiDaySunny />;
            case 'Thunderstorm':
                return <TiWeatherStormy />;
            case 'Drizzle':
                return <TiWeatherDownpour />;
            case 'Rain':
                return <TiWeatherShower />;
            case 'Snow':
                return <LuCloudSnow />;
            case 'Mist':
                return <RiMistLine />;
            case 'Smoke':
                return <WiSmoke />;
            case 'Haze':
                return <RiHazeLine />;
            case 'Dust':
                return <WiDust />;
            case 'Fog':
                return <RiFoggyLine />;
            case 'Clouds':
                return <BsClouds />;
            case 'Partly Sunny':
                return <WiDayCloudy />;
            default:
                return null;
        }
    }

  return (
    <div className="w-[35vw] max-w-xl h-auto rounded-3xl p-6 flex flex-col gap-4 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white shadow-lg border border-1 border-gray-200 dark:border-none justify-center">
    
    <div className='flex items-center gap-2 w-[30vw] mt-4 '>
        <span className='text-2xl'><IoLocationSharp /></span>
        <span className='text-lg'>Lucknow, Uttar Pradesh</span>
    </div>
    <div className='flex justify-between gap-16 w-full items-center w-[30vw]'>
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-1 justify-start'>
                <span className='text-5xl font-semibold '>Monday</span>
                <span className='text-xl dark:text-gray-200 mt-1'>24 April, 2025</span>
            </div>
            <div className='flex flex-col w-full justidy-start'>
                <span className='text-5xl font-semibold'>26&deg;C</span>
                <span className='text-md dark:text-gray-300 mt-1'>High: 27 &nbsp; Low:10</span>
            </div>
        </div>
        <div className='flex flex-col'>
            <span className='text-9xl mt-[-60px] mr-4'>{currentWeather('Partly Sunny')}</span>
            <span className='text-2xl text-center mr-6 font-semibold'>Clear</span>
            <span className='text-md dark:text-gray-300 mt-2 text-center mr-6'>Feels Like: 26&deg;C</span>
        </div>
    </div>
    </div>
  );
}

export default CurrentWeatherCard;

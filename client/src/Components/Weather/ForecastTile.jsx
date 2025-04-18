import React from "react";
import { WiDayCloudy } from "react-icons/wi";
import { IoLocationSharp, IoRainyOutline } from "react-icons/io5";
import { TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy } from "react-icons/ti";
import { WiDayHaze, WiSmoke, WiDust, WiDaySunny } from "react-icons/wi";
import { RiDrizzleLine, RiMistLine, RiHazeLine, RiFoggyLine } from "react-icons/ri";
import { LuCloudSnow } from "react-icons/lu";
import { BsClouds } from "react-icons/bs";

const ForecastTile = ({ temperature, weatherPrediction, Humidity, Time }) => {

  const currentWeather = (weather) => {
          switch (weather) {
              case 'Clear':
                  return <WiDaySunny className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Thunderstorm':
                  return <TiWeatherStormy className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Drizzle':
                  return <TiWeatherDownpour className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Rain':
                  return <TiWeatherShower className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Snow':
                  return <LuCloudSnow className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Mist':
                  return <RiMistLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Smoke':
                  return <WiSmoke className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Haze':
                  return <RiHazeLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Dust':
                  return <WiDust className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Fog':
                  return <RiFoggyLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Clouds':
                  return <BsClouds className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              case 'Partly Sunny':
                  return <WiDayCloudy className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
              default:
                  return null;
          }
      }

  return (
    <div className="duration-300 font-mono text-gray-900 dark:text-white group cursor-pointer relative overflow-hidden 
      w-24 h-32 bg-gray-100 dark:bg-[#22272B] rounded-3xl p-3 
      hover:w-44 hover:bg-blue-100 dark:hover:bg-[#1E2A3A] shadow-md">

      <h3 className="text text-center mx-auto">{Time}</h3>

      <div className="gap-4 relative mt-1">
        {currentWeather('Partly Sunny')}

        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-xl text-center 
          group-hover:translate-x-3 group-hover:-translate-y-9 group-hover:scale-100">
          {temperature}°
        </h4>
      </div>

      <div className="absolute duration-300 -left-32 group-hover:left-3 mt-2 text-xs font-semibold text-center">
        <p>{weatherPrediction}</p>
        <p>{Humidity}% humidity</p>
      </div>
    </div>
  );
};

export default ForecastTile;

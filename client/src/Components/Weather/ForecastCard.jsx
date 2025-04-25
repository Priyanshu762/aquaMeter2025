import React from 'react';
import ForecastTile from './ForecastTile';
import {
  WiDayCloudy, WiDaySunny, WiSmoke, WiDust, WiSunrise,
} from "react-icons/wi";
import {
  TiWeatherStormy, TiWeatherDownpour, TiWeatherShower,
} from "react-icons/ti";
import {
  RiMistLine, RiHazeLine, RiFoggyLine,
} from "react-icons/ri";
import { LuCloudSnow } from "react-icons/lu";
import { BsClouds } from "react-icons/bs";
import { TbSunset2 } from "react-icons/tb";

const ForecastCard = ({
  todayForecast = [
    { temperature: '26', weatherPrediction: 'Heavy Raining', humidity: '30', time: '2 PM' },
    { temperature: '29', weatherPrediction: 'Mostly Cloudy', humidity: '25', time: '4 PM' },
    { temperature: '30', weatherPrediction: 'Sunny', humidity: '50', time: '6 PM' },
    { temperature: '27', weatherPrediction: 'Thunderstorm', humidity: '78', time: '10 PM' },
  ],
  tomorrowForecast = { temp: 28, weather: 'Thunder Storm' },
  sunrise = '6:45 AM',
  sunset = '5:30 PM',
  lengthOfDay = '10h 23m'
}) => {

  const normalizeWeather = (desc) => {
    const lowered = desc.toLowerCase();
    if (lowered.includes("rain") || lowered.includes("shower")) return "Rain";
    if (lowered.includes("thunder")) return "Thunderstorm";
    if (lowered.includes("drizzle")) return "Drizzle";
    if (lowered.includes("snow")) return "Snow";
    if (lowered.includes("clear") || lowered === "sunny") return "Clear";
    if (lowered.includes("cloud")) return "Clouds";
    if (lowered.includes("haze")) return "Haze";
    if (lowered.includes("mist")) return "Mist";
    if (lowered.includes("smoke")) return "Smoke";
    if (lowered.includes("fog")) return "Fog";
    if (lowered.includes("dust")) return "Dust";
    return "Clear";
  };

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

  const normalizedTomorrow = normalizeWeather(tomorrowForecast.weather);

  return (
    <div className="w-full max-w-xl h-auto rounded-3xl p-4 md:p-6 flex flex-col gap-4 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white shadow-lg border border-gray-200 dark:border-none">

      <h3 className="text-lg sm:text-xl font-semibold">Today / Week</h3>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Forecast list */}
        <div className="flex flex-col gap-2 w-full lg:w-2/3">
          {/* Hourly Forecast */}
          <div className="w-full h-40 sm:h-36 p-2 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600
            bg-gradient-to-r from-gray-100 to-gray-300 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)]
            border border-gray-200 dark:border-none rounded-3xl backdrop-blur-lg">
            {todayForecast.map((item, index) => (
              <ForecastTile
                key={index}
                temperature={item.temperature}
                weatherPrediction={item.weatherPrediction}
                humidity={item.humidity}
                time={item.time}
              />
            ))}
          </div>

          {/* Tomorrow Forecast */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full p-4 rounded-3xl 
            bg-gradient-to-r from-gray-100 to-gray-300 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)]
            border border-gray-200 dark:border-none">
            <div className="text-center sm:text-left">
              <p className="text-sm">Tomorrow</p>
              <h2 className="text-3xl font-bold">{tomorrowForecast.temp}°</h2>
              <p className="text-sm">{tomorrowForecast.weather}</p>
            </div>
            <div>
              <span className="text-6xl sm:text-7xl">{currentWeatherIcon(normalizedTomorrow)}</span>
            </div>
          </div>
        </div>

        {/* Right: Sunrise/Sunset Info */}
        <div className="w-full lg:w-1/3 p-4 rounded-3xl flex flex-col justify-between items-center
          bg-gradient-to-r from-gray-100 to-gray-300 dark:from-[rgba(255,255,255,0.1)] dark:to-[rgba(255,255,255,0.1)]
          border border-gray-200 dark:border-none gap-4">
          <div className="text-center text-base sm:text-lg font-medium">
            <span className="flex justify-center items-center gap-1 sm:gap-2">
              Sunrise <WiSunrise className="text-2xl sm:text-3xl" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">{sunrise}</h2>
          </div>

          <div className="text-center text-base sm:text-lg font-medium">
            <span className="flex justify-center items-center gap-1 sm:gap-2">
              Sunset <TbSunset2 className="text-2xl sm:text-3xl" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">{sunset}</h2>
          </div>

          <div className="text-center text-base sm:text-lg font-medium">
            <p>Length of Day</p>
            <h2 className="text-lg sm:text-xl font-bold">{lengthOfDay}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;

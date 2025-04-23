import React from "react";
import {
  WiDayCloudy, WiDaySunny, WiSmoke, WiDust,
} from "react-icons/wi";
import {
  IoRainyOutline,
} from "react-icons/io5";
import {
  TiWeatherStormy, TiWeatherDownpour, TiWeatherShower,
} from "react-icons/ti";
import {
  RiMistLine, RiHazeLine, RiFoggyLine,
} from "react-icons/ri";
import { LuCloudSnow } from "react-icons/lu";
import { BsClouds } from "react-icons/bs";

const ForecastTile = ({ temperature, weatherPrediction, humidity, time }) => {
  // Normalize weather descriptions to match known categories
  const normalizeWeather = (desc) => {
    const lowered = desc.toLowerCase();
    if (lowered.includes("rain") || lowered.includes("showers")) return "Rain";
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
    return "Clear"; // default fallback
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Thunderstorm":
        return <TiWeatherStormy className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Drizzle":
        return <TiWeatherDownpour className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Rain":
        return <TiWeatherShower className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Snow":
        return <LuCloudSnow className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Mist":
        return <RiMistLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Smoke":
        return <WiSmoke className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Haze":
        return <RiHazeLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Dust":
        return <WiDust className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Fog":
        return <RiFoggyLine className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      case "Clouds":
        return <BsClouds className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
      default:
        return <WiDayCloudy className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-[-5px] text-center ml-2" />;
    }
  };

  const normalized = normalizeWeather(weatherPrediction);

  return (
    <div className="duration-300 font-mono text-gray-900 dark:text-white group cursor-pointer relative overflow-hidden 
      w-24 h-32 bg-gray-100 dark:bg-[#22272B] rounded-3xl p-3 
      hover:w-44 hover:bg-blue-100 dark:hover:bg-[#1E2A3A] shadow-md">

      <h3 className="text text-center mx-auto">{time || '2 PM'}</h3>

      <div className="gap-4 relative mt-1">
        {getWeatherIcon(normalized)}

        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-xl text-center 
          group-hover:translate-x-3 group-hover:-translate-y-9 group-hover:scale-100">
          {temperature}°
        </h4>
      </div>

      <div className="absolute duration-300 -left-32 group-hover:left-3 mt-2 text-xs font-semibold text-center">
        <p>{weatherPrediction}</p>
        <p>{humidity}% humidity</p>
      </div>
    </div>
  );
};

export default ForecastTile;

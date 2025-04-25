import React, { useEffect, useState } from 'react'
import { DisplayCard, DateCard, DataCard, ForecastCard, EarthCard, SearchBar, CurrentWeatherCard } from '../../Components'
import { WiStrongWind, WiHumidity } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import { FaCloudRain } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { BsFillCloudsFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import axios from 'axios';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const response = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          setWeatherData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch weather data:', error);
        }
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);

  if (!weatherData) {
    return (
      <div className="text-center mt-10 text-gray-800 dark:text-gray-200 text-xl sm:text-2xl">
        Loading weather data...
      </div>
    );
  }

  const { current } = weatherData;

  const calculateLengthOfDay = (sunrise, sunset) => {
    const duration = (sunset - sunrise) * 1000;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <span className="w-full px-4 md:px-8 lg:px-16">
        <SearchBar />
      </span>

      <div className="p-4 sm:px-6 md:px-16 lg:px-48 mt-4 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center lg:items-start">
        <div className="w-full lg:w-1/2">
          <CurrentWeatherCard data={current} />
        </div>

        <div className="w-full lg:w-1/2">
          <ForecastCard
            todayForecast={weatherData.hourly.slice(0, 4).map((item) => ({
              temperature: (item.temp).toFixed(0),
              weatherPrediction: item.weather[0].description,
              humidity: item.humidity,
              time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })
            }))}
            tomorrowForecast={{
              temp: (weatherData.hourly[8].temp).toFixed(0),
              weather: weatherData.hourly[8].weather[0].description,
            }}
            sunrise={new Date(weatherData.current.sunrise * 1000).toLocaleTimeString([], {
              hour: 'numeric',
              hour12: true,
            })}
            sunset={new Date(weatherData.current.sunset * 1000).toLocaleTimeString([], {
              hour: 'numeric',
              hour12: true,
            })}
            lengthOfDay={calculateLengthOfDay(
              weatherData.current.sunrise,
              weatherData.current.sunset
            )}
          />
        </div>
      </div>

      <div className="mx-4 px-4 sm:px-6 md:px-16 lg:px-28 mt-4">
        <div className="flex flex-col md:flex-wrap lg:flex-nowrap md:flex-row gap-6 overflow-x-auto md:overflow-x-visible">
          <div className="flex flex-row md:flex-col gap-4 min-w-[300px]">
            <DataCard icon={<WiStrongWind />} text="Wind Speed" value={current.wind_speed || 'N.A.'} unit="m/s" />
            <DataCard icon={<GiPressureCooker />} text="Wind Degree" value={current.wind_deg} unit="" />
          </div>
          <div className="flex flex-row md:flex-col gap-4 min-w-[300px]">
            <DataCard icon={<FiSun />} text="UV Index" value={current.uvi} unit="" />
            <DataCard icon={<FaCloudRain />} text="Dew Point" value={current.dew_point} unit="°C" />
          </div>
          <div className="flex flex-row md:flex-col gap-4 min-w-[300px]">
            <DataCard icon={<WiHumidity />} text="Humidity" value={current.humidity} unit="%" />
            <DataCard icon={<BsFillCloudsFill />} text="Clouds" value={current.clouds} unit="%" />
          </div>
          <div className="flex flex-row md:flex-col gap-4 min-w-[300px] mb-16">
            <DataCard icon={<FaEyeLowVision />} text="Visibility" value={current.visibility} unit="m" />
            <DataCard icon={<GiPressureCooker />} text="Pressure" value={current.pressure} unit="hPa" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherPage;

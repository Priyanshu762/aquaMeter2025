import React from 'react'
import { DisplayCard, DateCard, DataCard, ForecastCard, EarthCard, SearchBar, CurrentWeatherCard } from '../../Components'
import { WiStrongWind } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import { FaCloudRain } from "react-icons/fa";
import { useSelector } from 'react-redux';

const WeatherPage = () => {

  return (
    <>
        <span className=''>
        <SearchBar  />
        </span>
        <div className='p-4 mx-48 mt-4 flex gap-12 justify-center'>
        <div className=''>
        {/* <DateCard time='11:11' period='AM' day='Wednesday, June 15th' /> */}
        {/* <DisplayCard temperature='24' high='32' low='16' location='Lucknow, Uttar Pradesh' weather='Rain'  /> */}
        <CurrentWeatherCard />
        </div>
        <div className=''>
            <ForecastCard />
        </div>
        </div>
        <div className='mx-48 mt-2 flex justify-between gap-34'>
            <div className=''>
            <EarthCard />
            </div>
            <div className='flex gap-4 mb-16'>
              <div className='flex flex-col gap-4'>
                  <DataCard icon={<WiStrongWind />} text="Wind Speed" value="12" unit="KM/H" />
                  <DataCard icon={<GiPressureCooker />} text="Pressure" value="720" unit="hpa" />
              </div>
              <div className='flex flex-col gap-4'>
                  <DataCard icon={<FiSun />} text="UV Index" value="2.3" unit="" />
                  <DataCard icon={<FaCloudRain />} text="Precipitation" value="27" unit="%" />
              </div>
            </div>
        </div>

    </>
  )
}

export default WeatherPage

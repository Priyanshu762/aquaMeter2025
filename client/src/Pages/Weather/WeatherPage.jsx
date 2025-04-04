import React from 'react'
import { DisplayCard, DateCard, DataCard, ForecastCard, EarthCard, SearchBar } from '../../Components'
import { WiStrongWind } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import { FaCloudRain } from "react-icons/fa";

const WeatherPage = () => {
  return (
    <>
        <SearchBar />
        <div className='p-4 mx-48 mt-8 flex gap-16 justify-between'>
        <div className='flex flex-col  gap-8 justify-between'>
        <DisplayCard />
        <DateCard />
        </div>
        <div className='mt-4'>
            <ForecastCard />
        </div>
        </div>
        <div className='mx-48 mt-12 flex justify-between gap-16'>
            <div>
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

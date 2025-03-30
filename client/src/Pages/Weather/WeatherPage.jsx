import React from 'react'
import { DisplayCard, DateCard, ForecastCard, EarthCard } from '../../Components'

const WeatherPage = () => {
  return (
    <>
        <div className='p-4 mx-auto mt-8 flex gap-32 justify-center'>
        <div className='flex flex-col  gap-8 justify-between'>
        <DateCard />
        <DisplayCard />
        </div>
        <div>
            <ForecastCard />
        </div>
        </div>
        <div className='mx-48 mt-8'>
            <EarthCard />
        </div>
    </>
  )
}

export default WeatherPage

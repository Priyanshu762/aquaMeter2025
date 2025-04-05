import React from 'react'

const AnalyticsStatCard = ({icon, name, unit, avg, min, max}) => {
  return (
      <div className="h-42 w-80 bg-gray-400 px-6 py-3 rounded-2xl shadow-lg hover:shadow-lg  transition-all duration-300 
      bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] text-gray-900 dark:from-[#5936B4] dark:to-[#362A84] dark:text-white border border-1 border-gray-300 dark:border-none">
        <div className='flex flex-col' >
            <div className='flex justify-between' >
                <div className='text-3xl font-medium'>{name}</div>
                <div className='text-5xl'>{icon}</div>
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='text-2xl font-semibold'> Avg: {avg}</div>
            <div className='text-2xl font-semibold'> Min: {min}</div>
            <div className='text-2xl font-semibold'> Max: {max}</div>
        </div>
    </div>
  )
}

export default AnalyticsStatCard

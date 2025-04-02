import React from 'react'
import { EventToggle } from '../../Components'

const CreateEvent = () => {

  return (
    <div>
      <div>
        <h1 className='text-5xl font-semibold'>Events</h1>
        <p className='text-lg mt-2'>See your scheduled events</p>
      </div>
      <div>
        <EventToggle />
      </div>
    </div>
  )
}

export default CreateEvent

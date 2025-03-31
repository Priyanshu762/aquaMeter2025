import React from 'react'
import { EventCard } from '../../Components'
import eventsData from '../../Data/eventsData/eventsData'

const EventsPage = () => {
  return (
    <div>
      <section className="py-12 px-6 ml-16">
      <h2 className="text-3xl text-center font-bold dark:text-slate-200 text-slate-800 mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {eventsData.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
    </div>
  )
}

export default EventsPage

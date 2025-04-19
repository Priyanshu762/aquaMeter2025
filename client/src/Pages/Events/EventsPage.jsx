import React, { useEffect } from 'react'
import { EventCard } from '../../Components'
import eventsData from '../../Data/eventsData/eventsData'
import axios from '../../utils/axios'
const EventsPage = () => {
  const [events, setEvents] = React.useState(eventsData)
  const formatDatesInArray=(dataArray, dateKey = "date")=> {
    return dataArray.map(item => {
      const newItem = { ...item }; 
  
      if (newItem[dateKey]) {
        const date = new Date(newItem[dateKey]);
        newItem[dateKey] = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
  
      return newItem;
    });
  }
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/upcoming-events')
        const formattedData= formatDatesInArray(response.data);
        setEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, [])
  console.log("Events list:", events);

  return (
    <div>
      <section className="py-12 px-6 ml-16">
        <h2 className="text-3xl text-center font-bold dark:text-slate-200 text-slate-800 mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default EventsPage

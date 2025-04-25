import React, { useEffect, useState } from 'react'
import { EventCard } from '../../Components'
import axios from '../../utils/axios'
import EventDetailsSkeleton from '../../Skeletons/EventDetailsSkeleton';
import EventCardSkeleton from '../../Skeletons/EventCardSkeleton';

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
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
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/events/upcoming-events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        const formattedData= formatDatesInArray(response.data);
        setEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [])
  console.log("Events list:", events);

  if(loading) return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ml-8'>
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  );

  return (
    <div>
      <section className="py-12 px-6 ml-16">
        <h2 className="text-3xl text-center font-bold dark:text-slate-200 text-slate-800 mb-8">Upcoming Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
        ) : (
          <div>
            <h2 className="text-2xl text-center dark:text-slate-200 text-slate-800 mb-8">No Events Found</h2>
            <p className="text-center text-gray-500">Please check back later.</p>
          </div>
        )}
        
      </section>
    </div>
  )
}

export default EventsPage

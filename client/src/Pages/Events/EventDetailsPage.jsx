import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaShareAlt } from "react-icons/fa";
import { EventInfoCard, EventRegisterCard } from "../../Components";

const isLoggedIn = () => !!localStorage.getItem("user");

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const event = {
    id: eventId,
    name: "Blind Coding",
    date: "2025-04-15",
    time: "10:00 AM - 2:00 PM",
    location: "Department of Computer Science, Delhi University",
    description:
      "A thrilling coding challenge where participants code without seeing their screens. Test your logic, memory, and speed!",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    participants: 136,
    organizer: "Sankalan 2025",
    contact: "sankalan@cs.du.ac.in",
    impressions: 30189,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date(event.date).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days} Days Left`);
      } else {
        setTimeLeft("Event Started");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  

  return (
    <>
    <div className="flex justify-between gap-2">
        <div className="w-2/3">
            <EventInfoCard 
                imgUrl={event.imageUrl}
                name={event.name}
                description={event.description}
                date={event.date}
                time={event.time}
                location={event.location}
                />
        </div>
        <div className="w-1/3">
            <EventRegisterCard />
        </div>
    </div>
    </>
  );
};

export default EventDetailsPage;

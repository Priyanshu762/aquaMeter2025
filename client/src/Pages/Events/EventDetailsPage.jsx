import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaShareAlt } from "react-icons/fa";
import { EventInfoCard, EventRegisterCard } from "../../Components";
import EventDetailsSkeleton from "../../Skeletons/EventDetailsSkeleton";
import axios from "../../utils/axios";
const isLoggedIn = () => !!localStorage.getItem("user");

const EventDetailsPage = ({ event_Id }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(false);
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
  const [eventDetails, setEventDetails] = useState(event);


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
  const formatDatesInArray = (data, dateKey = "date") => {
    const newItem = { ...data };
    if (newItem[dateKey]) {
      const date = new Date(newItem[dateKey]);
      newItem[dateKey] = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
    return newItem;
  };

  useEffect(() => {
    const fetchEventDetails = async () => {

      try {
        const response = await axios.get(`/api/events/${eventId}`);
        console.log("Response from getEventDetails", response);
        const data = response.data
        const foramattedData = formatDatesInArray(data);
        setEventDetails(foramattedData);
        console.log("Event details:", eventDetails);

      } catch (error) {
        console.log("Error in EventDetailPage", error);
      } finally {
        setLoading(false)
      }

    }
    fetchEventDetails()
  }, [])

  if (loading) return <EventDetailsSkeleton />;


  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="w-2/3">
          <EventInfoCard
            imgUrl={eventDetails.image}
            name={eventDetails.name}
            description={eventDetails.description}
            date={eventDetails.date}
            time={eventDetails.time}
            location={eventDetails.location}
          />
        </div>
        <div className="w-1/3">
          <EventRegisterCard event={eventDetails} />
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;

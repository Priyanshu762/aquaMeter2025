import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { SlCalender } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { FaShareSquare } from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import axios from "../../utils/axios"
import { toast } from "react-toastify";
import {eventParticapted} from "../../Store/authSlice"
import { useDispatch } from "react-redux";
const EventRegisterCard = ({ event }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch()
  const [registered, setRegistered] = useState(false);
  // if(user?.parcipatedEvents.includes(event._id)){
  //   setRegistered(true);
  // }

  // Event details (Replace these with dynamic data if needed)
  const eventTitle = event.title || "Tech Fest 2025";
  const eventDate = event.date || "2025-07-15";
  const eventTime = event.time || "10:00 AM - 2:00 PM";
  const eventLocation = event.location || "University Auditorium";
  const eventUrl = event.url || window.location.href; // Dynamic URL
  const [loading,setLoading] = useState(false);
  // Function to handle registration

  useEffect(() => {
    if(user?.participatedEvents.includes(event._id)){
      setRegistered(true);
    }
  })
  const handleRegister = async () => {
    // setRegistered(true);
    setLoading(true)
    try {
      const eventId = event._id
      const response = await axios.post(`/api/events/register/${eventId}`);

      console.log("Response from register in event register card", response);
      await dispatch(eventParticapted({eventId:event._id}));
      toast.success("You have successfully registered for the event!");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      console.log("Error in handleRegister", error);
    }finally{
      setLoading(false);
      
    }

  };

  // Function to share event
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        text: `Join us for ${eventTitle} on ${eventDate} at ${eventLocation}.`,
        url: eventUrl,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  // Function to add event to Google Calendar
  const handleCalendarInvite = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      eventTitle
    )}&dates=${eventDate.replace(/-/g, "")}/${eventDate.replace(/-/g, "")}&details=Join+us+for+${encodeURIComponent(
      eventTitle
    )}+at+${encodeURIComponent(eventLocation)}&location=${encodeURIComponent(
      eventLocation
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="p-6 flex flex-col justify-start gap-6 dark:bg-gray-800 bg-white shadow-xl rounded-lg mt-4 mr-4 border-l-8 border-gray-900 dark:border-gray-100">
      {/* Free Badge + Share & Calendar Buttons */}
      <div className="flex gap-8 justify-between">
        <div className="justify-start items-end">
          <span className="text-xl font-semibold">Free</span>
        </div>
        <div className="flex gap-8">
          <span onClick={handleCalendarInvite} className="cursor-pointer">
            <SlCalender size={20} />
          </span>
          <span onClick={handleShare} className="cursor-pointer">
            <FaShareSquare size={20} />
          </span>
        </div>
      </div>

      {/* User Info + Register Button */}
      <div className="flex justify-between gap-8">
        <div className="flex flex-col">
          <span>{user?.name || "Username"}</span>
          <span>{user?.email || "Email ID"}</span>
        </div>
        <div>{
          user.role=="user"&&


            <button
            onClick={handleRegister}
            disabled={registered||loading}
            className={`flex justify-center gap-1 mt-2 ${registered ? "bg-gray-500" : "bg-green-600"
            } p-1 px-2 pr-4 rounded-sm text-white`}
            >
            <FaCheck className="ml-1 mt-1" />
            &nbsp; {
              registered ? "Registered" : "Register"
            }
          </button>
          }
        </div>
      </div>

      {/* Registered Count & Impressions */}
      <div className="flex flex-col border-t-2 dark:border-gray-100 w-full border-gray-900">
        <div className="flex gap-8 justify-start items-center mt-4">
          <span>
            <IoIosPeople className="text-3xl bg-gray-700 rounded-sm text-gray-300" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">Registered</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{event.participantsCount}</span>
          </div>
        </div>
        <div className="flex gap-8 justify-start items-center mt-4">
          <span>
            <WiStars className="text-3xl bg-gray-700 rounded-sm text-gray-300" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">Required</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{event.participantsLimit
            }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegisterCard;

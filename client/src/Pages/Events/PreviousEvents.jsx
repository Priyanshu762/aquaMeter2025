import React from "react";
import previousEventsData from "../../Data/eventsData/previousEventsData";
import { PreviousEventCard } from "../../Components";

const PreviousEventsPage = () => {
  return (
    <div>
      <section className="py-12 px-6 ml-16">
        <h2 className="text-3xl text-center font-bold dark:text-slate-200 text-slate-800 mb-8">
          Previous Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previousEventsData.map((event, index) => (
            <PreviousEventCard key={index} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PreviousEventsPage;

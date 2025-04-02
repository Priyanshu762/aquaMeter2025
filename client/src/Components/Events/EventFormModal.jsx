import React, { useEffect, useRef, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const eventSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().required("Location is required"),
});

const EventFormModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const onSubmit = async (data) => {
    console.log("Event Data Submitted:", data);
    toast.success("Event created successfully!", { autoClose: 3000 });
    reset();
    setTimeout(() => onClose(), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div ref={modalRef} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create Event</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
                <input
                type="text"
                placeholder="Event Name"
                {...register("name")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                />              
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="date"
                {...register("date")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            <div>
              <input
                type="time"
                {...register("time")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                />
              {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Location"
                {...register("location")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
                />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded transition hover:bg-gray-600">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-700 text-white rounded transition hover:bg-indigo-800">
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(EventFormModal);
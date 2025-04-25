import React, { useEffect, useRef, useState, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../utils/axios'
// Validation Schema
const eventSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().required("Location is required"),
  participantsLimit: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .integer()
    .required("Participants limit is required"),
});

const EventFormModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file); // register file in form
    }
  };

  const onSubmit = async (data) => {
    try {
      data.image = imageFile; // attach actual image file
      const token = localStorage.getItem("authToken");
      console.log("Submitted Event:", data);
      const response = await axios.post('/api/events', data, {
        headers: {
          'Content-Type': "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      console.log("Response from create events", response);

      toast.success("Event created successfully!", { autoClose: 3000 });
      reset();
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 5000 });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  const isAtLeastTomorrow = (value) => {
    const selectedDate = new Date(value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return selectedDate >= tomorrow || "Date must be at least tomorrow";
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      {/* <InputField register={register}/> */}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div ref={modalRef} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg">
          <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">Create Event</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

            {/* Event Name */}
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Event Name"
                {...register("name")}
                className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <textarea
                placeholder="Event Description"
                {...register("description")}
                rows={3}
                className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Date & Time */}
            <input
              type="date"
              {...register("date", {
                validate: value => {
                  const selectedDate = new Date(value);
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1); // move to tomorrow
                  tomorrow.setHours(0, 0, 0, 0); // normalize

                  return selectedDate >= tomorrow || "Date must be at least tomorrow";
                }
              })}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // 86400000ms = 1 day
              className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}


            <div>
              <input
                type="time"
                {...register("time")}
                className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </div>

            {/* Location */}
            <div>
              <input
                type="text"
                placeholder="Location"
                {...register("location")}
                className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            {/* Participants Limit */}
            <div>
              <input
                type="number"
                placeholder="Participants Required"
                {...register("participantsLimit")}
                className="w-full py-3 px-4 border dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.participantsLimit && <p className="text-red-500 text-sm mt-1">{errors.participantsLimit.message}</p>}
            </div>

            {/* Image Upload */}
            <div className="col-span-1 row-span-2">
              <label htmlFor="file-upload" className="block text-gray-700 dark:text-gray-200 mb-2">Upload Image</label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
              />

            </div>
            <div className="col-span-1 row-span-2 flex justify-center items-center">
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-28 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-center gap-6 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-indigo-700 hover:bg-indigo-800 text-white transition disabled:opacity-50"
              >
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

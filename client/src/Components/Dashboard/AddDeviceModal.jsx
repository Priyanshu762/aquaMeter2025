import React, { useEffect, useRef, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema for device
const deviceSchema = yup.object().shape({
  deviceName: yup.string().required("Device name is required"),
  deviceId: yup.string().required("Device ID is required"),
  latitude: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required")
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),
  longitude: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required")
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),
});

const AddDeviceModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(deviceSchema),
  });

  const onSubmit = async (data) => {
    console.log("Device Data Submitted:", data);
    toast.success("Device added successfully!", { autoClose: 3000 });
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
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn z-50">
        <div ref={modalRef} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Device</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <input
                type="text"
                placeholder="Device Name"
                {...register("deviceName")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
              />
              {errors.deviceName && <p className="text-red-500 text-sm">{errors.deviceName.message}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Device ID"
                {...register("deviceId")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
              />
              {errors.deviceId && <p className="text-red-500 text-sm">{errors.deviceId.message}</p>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Latitude"
                {...register("latitude")}
                step="any"
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
              />
              {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Longitude"
                {...register("longitude")}
                step="any"
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
              />
              {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded transition hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-700 text-white rounded transition hover:bg-blue-800">
                {isSubmitting ? "Adding..." : "Add Device"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(AddDeviceModal);

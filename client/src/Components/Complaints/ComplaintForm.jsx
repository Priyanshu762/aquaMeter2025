import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  location: yup.string().required("Location is required"),
  issue: yup.string().required("Issue type is required"),
  additionalInfo: yup.string(),
  images: yup.mixed().test(
    "fileSize",
    "Each file should be less than 5MB",
    (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) => file.size <= 5 * 1024 * 1024);
    }
  ),
});

const ComplaintForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [imagePreviews, setImagePreviews] = useState([]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const previews = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeImage = (id) => {
    setImagePreviews(imagePreviews.filter((img) => img.id !== id));
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">📄 Register Complaint</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200">Name</label>
          <input type="text" {...register("name")} className="w-full border rounded p-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">Phone Number</label>
          <input type="text" {...register("phone")} className="w-full border rounded p-2" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">Location</label>
          <input type="text" {...register("location")} className="w-full border rounded p-2" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">Issue Type</label>
          <select {...register("issue")} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white focus:outline-none">
            <option value="">Select an issue</option>
            <option value="garbage">Garbage</option>
            <option value="foul smell">Foul Smell</option>
            <option value="discoloration">Discoloration</option>
            <option value="dead aquatic life">Dead Aquatic Life</option>
            <option value="fecal discharge">Fecal Discharge</option>
            <option value="industrial discharge">Industrial Discharge</option>
            <option value="others">Others</option>
          </select>
          {errors.issue && <p className="text-red-500 text-sm">{errors.issue.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">Upload Images</label>
          <div className="border-dashed border-2 border-gray-400 p-4 flex flex-wrap gap-2 rounded-lg">
            <input
              type="file"
              {...register("images")}
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <FiPlus size={24} />
              <span className="text-xs">Add More</span>
            </label>
            {imagePreviews.map(({ url, id }) => (
              <div key={id} className="relative w-24 h-24">
                <img src={url} alt="preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 cursor-pointer"
                  onClick={() => removeImage(id)}
                  type="button"
                >
                  <IoClose size={16} />
                </button>
              </div>
            ))}
          </div>
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">Additional Information</label>
          <textarea {...register("additionalInfo")} className="w-full border rounded p-2"></textarea>
        </div>

        <button type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-400 font-semibold cursor-pointer"
            >
          
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
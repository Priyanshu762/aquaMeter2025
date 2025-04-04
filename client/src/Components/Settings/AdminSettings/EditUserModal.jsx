import React, { useState, useEffect, useRef } from "react";

const EditUserModal = ({ isOpen, user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });
  const modalRef = useRef(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transition-all duration-300"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit User</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-700 text-white rounded transition hover:bg-indigo-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

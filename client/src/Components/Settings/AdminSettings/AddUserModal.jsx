import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!userData.name || !userData.email) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...userData,
    };

    onAddUser(newUser);
    setUserData({ name: "", email: "", role: "User" }); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">➕ Add New User</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/80 outline-none transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select
            name="role"
            value={userData.role}
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
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;

import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
  const [visible, setVisible] = useState({ old: false, new: false, confirm: false });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSavePassword = async () => {
    console.log('Password Change Data:', passwords);
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/change-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      }, { withCredentials: true });
      setPasswords({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      <div className="space-y-4">

        <label className="block relative">
          <span className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">Old Password</span>
          <input
            type={visible.old ? 'text' : 'password'}
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            className="w-full pl-10 pr-10 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
          />
          <span
            className="absolute top-[42px] right-3 text-gray-500 dark:text-gray-300 cursor-pointer"
            onClick={() => toggleVisibility('old')}
          >
            {visible.old ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>

        <label className="block relative">
          <span className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">New Password</span>
          <input
            type={visible.new ? 'text' : 'password'}
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full pl-10 pr-10 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
          />
          <span
            className="absolute top-[42px] right-3 text-gray-500 dark:text-gray-300 cursor-pointer"
            onClick={() => toggleVisibility('new')}
          >
            {visible.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>

        <label className="block relative">
          <span className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">Confirm New Password</span>
          <input
            type={visible.confirm ? 'text' : 'password'}
            name="confirmNewPassword"
            value={passwords.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="w-full pl-10 pr-10 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
          />
          <span
            className="absolute top-[42px] right-3 text-gray-500 dark:text-gray-300 cursor-pointer"
            onClick={() => toggleVisibility('confirm')}
          >
            {visible.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>

        <button
          onClick={handleSavePassword}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;

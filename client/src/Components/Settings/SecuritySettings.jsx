import React, { useState } from 'react';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    console.log('Password Change Data:', passwords);
    alert('Password changed successfully!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      <div className="space-y-4">
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handleChange}
          placeholder="Old Password"
          className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
        />
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
        />
        <input
          type="password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
        />
        <button
          onClick={handleSavePassword}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;

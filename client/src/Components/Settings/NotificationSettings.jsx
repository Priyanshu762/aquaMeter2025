import React, { useState } from 'react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    console.log('Notification Preferences:', notifications);
    alert('Notification preferences updated successfully!');
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100 text-gray-800">Notification Settings</h2>

      <div className="space-y-4">
        {Object.keys(notifications).map((key) => (
          <label key={key} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name={key}
              checked={notifications[key]}
              onChange={handleChange}
              className="peer hidden"
            />
            <span className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all duration-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
              {notifications[key] && (
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </span>
            <span className="ml-3 dark:text-gray-100 text-gray-800">
              {key === 'email' ? 'Receive Email Notifications' : key === 'sms' ? 'Receive SMS Notifications' : 'Receive App Notifications'}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default NotificationSettings;

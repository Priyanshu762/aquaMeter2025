import React, { useState } from 'react';
import ProfileSettings from '../Settings/ProfileSettings';
import SecuritySettings from '../Settings/SecuritySettings';
import NotificationSettings from '../Settings/NotificationSettings';
import DeleteAccount from '../Settings/DeleteAccount';

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { name: 'Profile', key: 'profile' },
    { name: 'Security', key: 'security' },
    { name: 'Notifications', key: 'notifications' },
    { name: 'Delete Account', key: 'delete' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h1>

        <div className="flex mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === tab.key
                  ? 'border-b-2 border-indigo-600 text-indigo-600 bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-white'
                  : 'text-gray-500 hover:text-indigo-600 dark:hover:text-white cursor-pointer'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'delete' && <DeleteAccount />}
      </div>
    </div>
  );
};

export default SettingsSection;

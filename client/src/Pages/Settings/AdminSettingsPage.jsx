import React, { useState } from 'react';
import { AccessControl, GeneralSettings, SystemLogs, UserManagement } from '../../Components';



const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { name: 'User Management', key: 'users' },
    { name: 'System Logs', key: 'logs' },
    { name: 'Access Control', key: 'access' },
    { name: 'General Settings', key: 'general' },
  ];

  return (
    <div className="min-h-screen  py-2 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Admin Settings</h1>

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

        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'logs' && <SystemLogs />}
        {activeTab === 'access' && <AccessControl />}
        {activeTab === 'general' && <GeneralSettings />}
      </div>
    </div>
  );
};

export default AdminSettingsPage;

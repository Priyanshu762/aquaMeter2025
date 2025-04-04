import React, { useState } from "react";

const GeneralSettingsPage = () => {
  const defaultSettings = {
    siteTitle: "My Application",
    enableNotifications: true,
    timezone: "UTC",
    language: "en",
    theme: "system",
    dateFormat: "DD/MM/YYYY",
    autoLogoutTime: 15,
    supportEmail: "support@example.com",
    enableDataSync: true,
  };

  const [settings, setSettings] = useState(defaultSettings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved!");
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    alert("Settings reset to default!");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">⚙️ General Settings</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Configure system-wide settings and preferences.
      </p>

      <div className="space-y-6">
        {/* Site Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Site Title</label>
          <input
            type="text"
            name="siteTitle"
            value={settings.siteTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">Enable Notifications</label>
          <input
            type="checkbox"
            name="enableNotifications"
            checked={settings.enableNotifications}
            onChange={handleToggleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
          <select
            name="timezone"
            value={settings.timezone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="UTC">UTC</option>
            <option value="IST">IST (India)</option>
            <option value="EST">EST (Eastern)</option>
            <option value="PST">PST (Pacific)</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Theme Mode */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Theme Mode</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
          <select
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        {/* Auto Logout */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Auto Logout (minutes)</label>
          <input
            type="number"
            name="autoLogoutTime"
            value={settings.autoLogoutTime}
            onChange={handleInputChange}
            min={1}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {/* Data Sync */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 dark:text-gray-300">Enable Data Sync</label>
          <input
            type="checkbox"
            name="enableDataSync"
            checked={settings.enableDataSync}
            onChange={handleToggleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Save Settings
          </button>
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">🌍 Welcome to Water Quality Monitor</h1>
      <p className="text-lg text-center max-w-2xl">
        This platform helps you track water quality in real-time, view analytics, and monitor alerts. 
        Stay informed and contribute to environmental sustainability.
      </p>

      <div className="mt-6 flex gap-4">
        <Link to="/analytics">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            📊 View Analytics
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            🔒 Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

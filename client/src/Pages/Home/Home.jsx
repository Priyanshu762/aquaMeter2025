import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaMapMarkedAlt,
  FaBell,
  FaCloudSun,
  FaDatabase,
  FaUsers,
} from "react-icons/fa";
import { Footer } from "../../Components";

const Home = () => {
  const isAdmin = false;

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white px-6 py-10">
      
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          💧 Real-Time Water Quality Monitoring 
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Empowering smart water body management through real-time monitoring,
          alerting, analytics, and environmental awareness.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {isAdmin ? (
            <>
              <Link to="/analytics">
                <button className="px-5 py-2 bg-blue-900 text-white rounded-lg shadow hover:bg-blue-800 transition font-semibold">
                  👨‍💻 Admin Analytics
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="px-5 py-2 bg-green-900 text-white rounded-lg shadow hover:bg-green-800 transition font-semibold">
                  🛠️ Admin Dashboard
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/map-view">
                <button className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-900 transition font-semibold cursor-pointer">
                  🌍 Live Water Map
                </button>
              </Link>
              <Link to="/complaints">
                <button className="px-5 py-2 bg-orange-700 text-white rounded-lg shadow hover:bg-orange-900 transition font-semibold cursor-pointer">
                  📝 Report an Issue
                </button>
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">🌟 Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={<FaChartLine size={28} />} title="Real-Time Analytics" description="Live graphs of water parameters like Temperature, pH, Turbidity per device." />
          <FeatureCard icon={<FaMapMarkedAlt size={28} />} title="Interactive Map" description="View device locations and real-time data across the region." />
          <FeatureCard icon={<FaBell size={28} />} title="Alerts & Notifications" description="Get notified instantly when toxic levels are detected." />
          <FeatureCard icon={<FaCloudSun size={28} />} title="Weather & AQI" description="Live weather and air quality from OpenWeather API integrated for local insights." />
          <FeatureCard icon={<FaDatabase size={28} />} title="Historical Trends" description="Study trends and download past water health reports." />
          <FeatureCard icon="🌍" title="Crowdsourced Reports" description="Let citizens participate by submitting reports on polluted or unsafe water bodies." />
        </div>
      </section>

      <section className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">🚀 How It Works</h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Our IoT-based system uses GPRS-enabled sensors that continuously monitor water bodies and send data to our server in real-time. Metrics like turbidity, TDS, pH, and temperature are visualized via intuitive dashboards, maps, and alerts. Admins can control devices, and users can contribute via the public reporting interface.
        </p>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          🌱 Join us in preserving our water bodies!
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Explore real-time water quality, raise awareness, and help keep our lakes and rivers clean.
        </p>
        <Link to="/map-view">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-xl shadow cursor-pointer">
            🌐 Explore Live Map
          </button>
        </Link>
      </section>
    </div>
    <div className="w-full">
      <Footer />
      </div>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 hover:scale-105 cursor-pointer">
    <div className="flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
      {typeof icon === "string" ? <span className="text-3xl">{icon}</span> : icon}
    </div>
    <h3 className="text-xl text-center font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-700 text-center dark:text-gray-300">{description}</p>
  </div>
);

export default Home;

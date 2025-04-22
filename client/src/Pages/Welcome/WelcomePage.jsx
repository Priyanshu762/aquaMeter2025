import { useSelector } from "react-redux";
import {
  FaMagic,
  FaUsers,
  FaExclamationTriangle,
  FaClipboardList,
  FaLightbulb,
  FaFileAlt,
  FaBell,
  FaChartBar,
} from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "guest";

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = {
    admin: [
      { label: "Total Events", value: 24, icon: <HiOutlineCalendar /> },
      { label: "Reports Submitted", value: 57, icon: <FaFileAlt /> },
      { label: "Active Alerts", value: 3, icon: <FaBell /> },
    ],
    ngo: [
      { label: "Events Attended", value: 12, icon: <HiOutlineCalendar /> },
      { label: "Reports Submitted", value: 9, icon: <FaFileAlt /> },
      { label: "New Alerts", value: 2, icon: <FaBell /> },
    ],
  };

  const recentActivities = {
    admin: [
      { icon: <FaClipboardList />, text: "You created a new event on 20th April" },
      { icon: <FaUsers />, text: "NGO X submitted a report" },
      { icon: <FaExclamationTriangle />, text: "Alert generated for high BOD levels" },
    ],
    ngo: [
      { icon: <FaClipboardList />, text: "You submitted a report on 18th April" },
      { icon: <HiOutlineCalendar />, text: "Attended event: River Clean-up Drive" },
      { icon: <FaExclamationTriangle />, text: "New alert received for Yamuna site" },
    ],
  };

  const announcements = [
    "📢 Water Quality Dashboard update coming soon!",
    "💡 Join our cleanup campaign on 25th April.",
    "🛠 Maintenance window: 22nd April, 2 AM - 5 AM.",
  ];

  const roleTip = {
    admin: {
      icon: <FaLightbulb />,
      text: 'Use the "Manage Events" panel to organize your programs efficiently.',
    },
    ngo: {
      icon: <FaLightbulb />,
      text: "Submit timely reports to ensure better coordination and tracking.",
    },
  };

  const roleLabels = {
    admin: { label: "Admin", icon: "🛡" },
    ngo: { label: "NGO", icon: "🤝" },
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      {/* Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaMagic className="text-blue-500" />
          {getTimeGreeting()}, {user?.name || "Admin"}!
          <span className="text-sm bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-0.5 rounded-md font-medium">
            {roleLabels[role]?.icon} {roleLabels[role]?.label}
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          {role === "admin"
            ? "Here’s your dashboard overview to manage and monitor events 👑"
            : "Here’s what’s happening in your events and reports 🌱"}
        </p>
      </motion.div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats[role].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4"
          >
            <div className="text-blue-500 text-xl">{stat.icon}</div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {role === "admin" && (
          <>
            <Card icon={<FaUsers size={24} />} title="Manage Events" link="/dashboard/create-event" />
            <Card icon={<HiOutlineCalendar size={24} />} title="View Attendance" link="/events/attendance" />
            <Card icon={<FaExclamationTriangle size={24} />} title="View Alerts" link="/dashboard/alerts" />
          </>
        )}

        {role === "ngo" && (
          <>
            <Card icon={<FaUsers size={24} />} title="Ongoing Events" link="/dashboard/ongoing-events" />
            <Card icon={<FaExclamationTriangle size={24} />} title="Submit Reports" link="/complaints" />
          </>
        )}
      </div>

      {/* Activity Feed */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaClipboardList className="text-blue-500" /> Recent Activity
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {recentActivities[role]?.map((activity, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-blue-500">{activity.icon}</span>
                {activity.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaBell className="text-yellow-500" /> Announcements
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {announcements.map((note, index) => (
              <li key={index} className="flex items-center gap-2">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tip Section */}
      <div className="mt-8 text-sm bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg flex items-start gap-3">
        <div className="text-xl text-yellow-400">{roleTip[role].icon}</div>
        <p>{roleTip[role].text}</p>
      </div>
    </div>
  );
};

const Card = ({ icon, title, link }) => (
  <motion.a
    href={link}
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-start justify-start gap-3 transition cursor-pointer"
  >
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <h2 className="text-xl font-semibold">{title}</h2>
  </motion.a>
);

export default WelcomePage;

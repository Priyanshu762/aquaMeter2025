import { useState } from "react";
import { FiHome, FiUsers, FiBell, FiSettings, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: "Home", icon: <FiHome size={24} />, link: "/" },
    { title: "Users", icon: <FiUsers size={24} />, link: "/users" },
    { title: "Alerts", icon: <FiBell size={24} />, link: "/alerts" },
    { title: "Settings", icon: <FiSettings size={24} />, link: "/settings" },
  ];

  return (
    <div className="flex">
      <div
        className={`h-screen bg-white-100 text-black dark:bg-gray-900 dark:text-white transition-all duration-300 border-r-2 dark:border-sidebarBorder
          ${isOpen ? "w-48" : "w-16"}`}
      >

        <div className="p-4 flex justify-start border-b-1">
          <button onClick={() => setIsOpen(!isOpen)}
          className=" rounded transition transform active:scale-90"
          >
            <FiMenu className="dark:text-white text-black" size={24} />
          </button>
        </div>

        <nav className="mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                to={item.link}
                className="flex items-center space-x-3 p-3 rounded-lg transition
                  dark:hover:bg-gray-700 hover:bg-gray-300"
              >
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </Link>
              {!isOpen && (
                <span className="absolute left-12 top-1/2 -translate-y-1/2 dark:bg-gray-800 bg-gray-500 text-white dark:text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

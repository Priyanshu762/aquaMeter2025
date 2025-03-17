
import { FiHome, FiUsers, FiBell, FiSettings, FiMenu } from "react-icons/fi";

const sidebarnavItems =  [
    { title: "Home", icon: <FiHome size={24} />, link: "" },
    { title: "Users", icon: <FiUsers size={24} />, link: "analytics" },
    { title: "Alerts", icon: <FiBell size={24} />, link: "alerts" },
    { title: "Settings", icon: <FiSettings size={24} />, link: "settings" },
];

export default sidebarnavItems;
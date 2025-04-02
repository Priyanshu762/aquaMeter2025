
import { FiHome, FiUsers, FiBell, FiSettings, FiMap } from "react-icons/fi";
import { MdEventRepeat } from "react-icons/md";

const sidebarnavItems =  [
    { title: "Home", icon: <FiHome size={24} />, link: "" },
    { title: "Users", icon: <FiUsers size={24} />, link: "analytics" },
    { title: "Alerts", icon: <FiBell size={24} />, link: "alerts" },
    { title: "Create Event", icon: <MdEventRepeat size={24} />, link: "create-event" },
    { title: "Settings", icon: <FiSettings size={24} />, link: "settings" },
];

export default sidebarnavItems;
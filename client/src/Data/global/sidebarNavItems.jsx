
import { FiHome, FiUsers, FiBell, FiSettings, FiMap } from "react-icons/fi";
import { MdEventRepeat } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";

const sidebarnavItems =  [
    { title: "Dashboard", icon: <VscDashboard size={24} />, link: "" },
    { title: "Analytics", icon: <IoAnalyticsSharp size={24} />, link: "analytics" },
    { title: "Alerts", icon: <FiBell size={24} />, link: "alerts" },
    { title: "Create Event", icon: <MdEventRepeat size={24} />, link: "create-event" },
    { title: "Settings", icon: <FiSettings size={24} />, link: "settings" },
];

export default sidebarnavItems;
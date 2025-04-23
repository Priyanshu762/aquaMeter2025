
import { FiHome, FiUsers, FiBell, FiSettings, FiMap } from "react-icons/fi";
import { MdEventRepeat } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import { BsFlower1 } from "react-icons/bs";
import { FaBuildingNgo } from "react-icons/fa6";
import { MdAddChart  } from "react-icons/md";

const sidebarnavItems =  [
    { title: "Welcome", icon: <BsFlower1 size={24} />, link: "welcome" },
    { title: "Dashboard", icon: <VscDashboard size={24} />, link: "" },
    { title: "Analytics", icon: <IoAnalyticsSharp size={24} />, link: "analytics" },
    { title: "Alerts", icon: <FiBell size={24} />, link: "alerts" },
    { title: "Complaints", icon: <MdAddChart  size={24} />, link: "all-complaints" },
    { title: "Create Event", icon: <MdEventRepeat size={24} />, link: "create-event" },
    { title: "Verify NGOs", icon: <FaBuildingNgo size={24} />, link: "verify-ngos" },
    { title: "Settings", icon: <FiSettings size={24} />, link: "settings" },
];

export default sidebarnavItems;
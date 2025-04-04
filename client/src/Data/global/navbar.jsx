import { FiBarChart2, FiMap, FiCalendar, FiAlertTriangle, FiCloud, FiHome } from "react-icons/fi"; 

export const NavbarMenu = [
    {
        id: 1,
        key: "home",
        title: "Home",
        link: "/",
        icon: <FiHome />,
    },
    {
        id: 2,
        key: "map-view",
        title: "Map View",
        link: "/map-view",
        icon: <FiMap />,
    },
    {
        id: 3,
        key: "events",
        title: "Events",
        link: "/events",
        icon: <FiCalendar />,
    },
    {
        id: 4,
        key: "complaints",
        title: "Complaints",
        link: "/complaints",
        icon: <FiAlertTriangle />,
    },
    {
        id: 5,
        key: "weather",
        title: "Weather",
        link: "/weather",
        icon: <FiCloud />,
    },
];

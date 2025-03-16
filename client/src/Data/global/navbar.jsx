import { FiBarChart2, FiMap, FiCalendar, FiAlertTriangle, FiCloud } from "react-icons/fi"; 

export const NavbarMenu = [
    {
        id: 1,
        key: "analytics",
        title: "Analytics",
        link: "/analytics",
        icon: <FiBarChart2 />,
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

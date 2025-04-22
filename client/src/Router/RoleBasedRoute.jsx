import { useSelector } from "react-redux";
import NotFound from "../Pages/NotFound/NotFound";

const RoleBasedRoute = ({ allowedRoles, children }) => {
    const user = useSelector((state) => state.auth.user);
    
    return allowedRoles.includes(user?.role) ? children : <NotFound />;
};

export default RoleBasedRoute;
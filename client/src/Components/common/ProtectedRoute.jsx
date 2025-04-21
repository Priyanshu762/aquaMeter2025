import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { token, isAuthenticated,user } = useSelector((state) => state.auth);

  if (isAuthenticated==null || !token==null) {
    return <Navigate to="/login" replace />;
  }

  //take params from url and check if user is admin or ngo
  if(isAuthenticated&&(location.pathname.includes('/login')||location.pathname.includes('/register'))){
    
    if(user?.role=='admin'&&user?.role=='ngo'){
      return <Navigate to="/dashboard" replace />;
    }else{
      return <Navigate to="/" replace />;
    }
  } 

  return children;
};

export default ProtectedRoute;

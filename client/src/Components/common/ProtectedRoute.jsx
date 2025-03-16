import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = true;

  return authToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

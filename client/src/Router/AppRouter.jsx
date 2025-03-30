import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Layout from "../Components/Layout/Layout";
import ScrollToTop from "../Components/common/ScrollToTop";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Dashboard from '../Pages/Dashboard/Dashboard'
import ProtectedRoute from "../Components/common/ProtectedRoute";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import AuthLayout from '../Components/Layout/AuthLayout'
import Analytics from "../Pages/Analytics/Analytics";
import MapViewPage from "../Pages/MapViewPage/MapViewPage";
import WeatherPage from "../Pages/Weather/WeatherPage";
import { useSelector } from "react-redux";


const AppRouter = () => {
  
  const authUser = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  console.log("User is logged in :", authUser,"Token is :", authToken);
  return (
    <Router >
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index  element={<Home />} />
        <Route path="analytics" element={<Home />} />
        <Route path="map-view" element={<Home />} />
        <Route path="weather" element={<WeatherPage />} />

        {/* protected route  */}
        <Route 
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="map-view" element={<MapViewPage />} />
        </Route>
      </Route>

      {/* auth pages without navbar */}
      <Route path="/" element={<AuthLayout />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
      </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

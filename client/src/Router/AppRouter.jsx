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
import ProfilePage from "../Pages/Profile/ProfilePage";
import SettingsPage from "../Pages/Settings/SettingsPage";
import EventsPage from "../Pages/Events/EventsPage";
import ComplaintsPage from "../Pages/Complaints/ComplaintsPage";
import PreviousEvents from "../Pages/Events/PreviousEvents";
import CreateEvent from "../Pages/Events/CreateEvent";
import AdminSettingsPage from "../Pages/Settings/AdminSettingsPage";
import EventDetailsPage from "../Pages/Events/EventDetailsPage";
import AlertsPage from "../Pages/Alerts/AlertsPage";
import LeaderboardPage from "../Pages/Leaderboard/LeaderboardPage";
import QRScanner from "../Components/QrScanner";
import ScannerPage from "../Pages/Attendance/ScannerPage";
import OngoingEvent from "../Components/Events/OngoingEvent";
import RoleBasedRoute from "./RoleBasedRoute";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


const AppRouter = () => {

  const authUser = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  console.log("User is logged in :", authUser, "Token is :", authToken);
  return (
    <Router >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="map-view" element={<MapViewPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="event/:eventId" element={
            <PrivateRoute>
              <EventDetailsPage />
            </PrivateRoute>
            } />
            
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="previous-events" element={<PreviousEvents />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="events/attendance" element={<ScannerPage />} />

          {/* protected route  */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="create-event"  
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <CreateEvent />
                </RoleBasedRoute>
              }
            />
            <Route path="ongoing-events" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'ngo']}>
                  <OngoingEvent />
                </RoleBasedRoute>
              }
            />
          </Route>
        </Route>

        {/* auth pages without navbar */}
        <Route path="/" element={<AuthLayout />} >
          <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="register" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

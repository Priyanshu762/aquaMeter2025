import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Loader } from "..";

const Layout = () => {
    const loading = useSelector((state) => state.loader.loading);
    
    if (loading) return <Loader />;

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

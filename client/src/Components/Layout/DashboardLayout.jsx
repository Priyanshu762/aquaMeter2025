import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "..";

const DashboardLayout = () => {
  return (
      <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-hidden">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import { Sidebar } from "..";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-scroll scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

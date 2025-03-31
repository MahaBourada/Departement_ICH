import React from "react";
import AdminNavigation from "./components/General/AdminNavigation";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/General/AdminHeader";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body bg-background bg-big-screen bg-repeat-y font-body text-black">
      <AdminNavigation />

      <div className="flex-grow">
        <AdminHeader />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

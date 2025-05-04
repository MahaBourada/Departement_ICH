import React from "react";
import AdminNavigation from "./components/Navigation/AdminNavigation";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/Navigation/AdminHeader";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body dark:bg-dark-background bg-background bg-big-screen bg-repeat-y font-body text-black dark:text-white">
      <AdminNavigation />

      <div className="flex-grow">
        <AdminHeader />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

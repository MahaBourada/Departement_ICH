import React from "react";
import AdminNavigation from "./components/Navigation/AdminNavigation";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/Navigation/AdminHeader";
import MobileAdminHeader from "./components/Navigation/MobileAdminHeader";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body bg-white bg-big-screen bg-repeat-y font-body text-black text-dynamic-base leading-9 readerMode:leading-loose dark:text-gray-300 dark:bg-dark-background">
      <AdminNavigation />

      <div className="flex-grow">
        <AdminHeader />
        <MobileAdminHeader />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

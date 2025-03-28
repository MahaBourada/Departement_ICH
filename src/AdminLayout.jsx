import React from "react";
import AdminHeader from "./components/General/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "./components/General/Footer";
import { ChevronDown, CircleUserRound } from "lucide-react";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body bg-background bg-big-screen bg-repeat-y font-body text-black">
      <AdminHeader />
      <div className="flex-grow">
        <header className="m-5 mx-6 flex justify-end">
          <div className="flex items-center justify-between w-fit cursor-pointer">
            <ChevronDown size={32} color="#232323" strokeWidth={2.5} />
            <p className="text-2xl font-semibold mx-2">Anis ROJBI</p>
            <CircleUserRound size={34} color="#232323" />
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

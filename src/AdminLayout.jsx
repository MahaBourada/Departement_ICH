import React from "react";
import AdminNavigation from "./components/General/AdminNavigation";
import { Outlet } from "react-router-dom";
import Footer from "./components/General/Footer";
import { ChevronDown, CircleUserRound } from "lucide-react";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body bg-background bg-big-screen bg-repeat-y font-body text-black">
      <AdminNavigation />

      <div className="flex-grow">
        <header
          className="m-5 mx-6 flex justify-end"
          aria-label="User controls"
        >
          <div
            className="flex items-center justify-between w-fit cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <ChevronDown
              size={32}
              color="#232323"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <p className="text-2xl font-semibold mx-2">Anis ROJBI</p>
            <CircleUserRound size={34} color="#232323" aria-hidden="true" />
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

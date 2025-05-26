import React from "react";
import AdminNavigation from "./components/Navigation/AdminNavigation";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/Navigation/AdminHeader";
import MobileAdminHeader from "./components/Navigation/MobileAdminHeader";
import ScrollToTop from "react-scroll-to-top";

const Layout = () => {
  return (
    <div className="App flex flex-row min-h-screen text-body bg-white bg-big-screen bg-repeat-y font-body text-black text-dynamic-base leading-9 readerMode:leading-loose dark:text-gray-300 dark:bg-dark-background">
      <AdminNavigation />

      <div className="flex-grow">
        <AdminHeader />
        <MobileAdminHeader />

        <Outlet />

        <ScrollToTop
          aria-label="Haut de page"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          smooth
          style={{
            boxShadow: "none",
            position: "fixed",
            border: "4px solid #1F1F1F",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F4F4F4",
          }}
          className="hover:translate-x-[1px] hover:translate-y-[1px]"
          component={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="1.5 0 20 10"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-up"
            >
              <path d="M8 6L12 2L16 6" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Layout;

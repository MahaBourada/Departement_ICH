import React from "react";
import Header from "./components/Navigation/UserHeader";
import { Outlet } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import i18n from "./i18n";
import ScrollToTop from "react-scroll-to-top";

const Layout = () => {
  const switchLang = (lang) => {
    localStorage.setItem("lang", lang);
    setTimeout(() => {
      i18n.changeLanguage(lang);
    }, 300);
    window.location.reload();
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="App flex flex-col min-h-screen text-body dark:bg-dark-background bg-background bg-big-screen bg-repeat-y font-body text-black dark:text-white">
      <Header switchLang={switchLang} />
      <Outlet />
      <Footer switchLang={switchLang} />
      <ScrollToTop
        aria-label="Haut de page"
        role="button"
        tabIndex={0}
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
  );
};

export default Layout;

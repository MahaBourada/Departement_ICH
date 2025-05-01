import React from "react";
import Header from "./components/Navigation/UserHeader";
import { Outlet } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import i18n from "./i18n";

const Layout = () => {
  const switchLang = (lang) => {
    localStorage.setItem("lang", lang);
    setTimeout(() => {
      i18n.changeLanguage(lang);
    }, 300);
    window.location.reload();
  };

  return (
    <div className="App flex flex-col min-h-screen text-body bg-background bg-big-screen bg-repeat-y font-body text-black">
      <Header switchLang={switchLang} />
      <Outlet />
      <Footer switchLang={switchLang} />
    </div>
  );
};

export default Layout;

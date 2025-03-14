import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="App flex flex-col min-h-screen text-body bg-background bg-big-screen bg-repeat-y font-body text-black">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

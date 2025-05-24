import {
  CircleUserRound,
  Image,
  ImageOff,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch";
import api from "../../api/api";
import { UserContext } from "../../contexts/UserContext.jsx";

const MobileAdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuShow = () => {
    setShowMenu((prev) => !prev);
  };

  const [minimalTheme, setMinimalTheme] = useState(
    () => localStorage.getItem("minimal-theme") || ""
  );

  const toggleTheme = () => {
    setMinimalTheme((prevTheme) => (prevTheme === "" ? "minimal" : ""));
  };

  const handleLinkClick = () => {
    setShowMenu(false);

    window.scrollTo({ top: 0 });
  };

  const navigate = useNavigate();

  const { user, setUser, setAccessToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.get("/auth/logout", {
        withCredentials: true,
      });

      setAccessToken(null);
      setUser(null);

      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 max-md:block hidden px-7 py-5 bg-main dark:bg-dark-main shadow-medium z-50">
      <div className="flex flex-row items-center justify-between">
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={100}
        />
        <button
          type="button"
          aria-controls="menu"
          aria-label={
            showMenu ? "Fermer le menu" : "Ouvrir le menu de navigation"
          }
          onClick={onMenuShow}
          className="focus:translate-[1px]"
        >
          {showMenu ? (
            <X size={36} color="#232323" strokeWidth={3} />
          ) : (
            <Menu size={36} color="#232323" strokeWidth={3} />
          )}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-[5.5rem] bg-main dark:bg-dark-main w-[80%] min-h-[200vh]">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-row justify-between items-center my-3">
              <div className="flex flex-row items-center">
                <CircleUserRound size={28} color="#232323" aria-hidden="true" />
                <p className="font-semibold mx-2">
                  {user?.first_name + " " + user?.last_name.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md px-4 py-2 cursor-pointer"
              >
                <LogOut size={26} color="#8E0000" strokeWidth={2.5} />
              </button>
            </div>

            <div className="h-7 bg-black w-[1px] rounded-full mr-1.5"></div>

            <ThemeSwitch />

            <button
              className="cursor-pointer w-fit flex justify-end items-center p-1 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main rounded-lg"
              onClick={toggleTheme}
              aria-label={
                minimalTheme === "minimal"
                  ? "Thème par défaut"
                  : "Thème minimaliste"
              }
            >
              {minimalTheme === "minimal" ? (
                <Image color="#232323" size={28} />
              ) : (
                <ImageOff color="#232323" size={28} />
              )}
            </button>
          </div>

          <nav className="flex flex-col items-center justify-between w-full mt-0.5">
            <NavLink
              onClick={handleLinkClick}
              to="/admin/tableau-de-bord"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Accueil
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-pages"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Pages
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-equipe"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Équipe
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-conferences"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Conférences
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-projets"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Projets
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-prix"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main" : ""
                }`
              }
            >
              Prix
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MobileAdminHeader;

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
import api from "../../api/api";
import { UserContext } from "../../contexts/UserContext.jsx";
import AccessibilityMenu from "../AccessibilityMenu.jsx";

const MobileAdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuShow = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLinkClick = () => {
    setShowMenu(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
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
          className="block dark:hidden"
        />
        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          width={100}
          className="hidden dark:block"
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
            <X
              size={36}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={3}
            />
          ) : (
            <Menu
              size={36}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={3}
            />
          )}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-[5.5rem] bg-main dark:bg-dark-main w-[80%] min-h-[200vh]">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-row justify-between items-center my-3">
              <div className="flex flex-row items-center">
                <CircleUserRound
                  size={28}
                  className="text-[#232323] dark:text-gray-300"
                  aria-hidden="true"
                />
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
            <AccessibilityMenu />
          </div>

          <nav className="flex flex-col items-center justify-between w-full mt-0.5">
            <NavLink
              onClick={handleLinkClick}
              to="/admin/tableau-de-bord"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
                }`
              }
            >
              Accueil
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-pages"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
                }`
              }
            >
              Pages
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-equipe"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
                }`
              }
            >
              Équipe
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-conferences"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
                }`
              }
            >
              Conférences
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-projets"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
                }`
              }
            >
              Projets
            </NavLink>

            <NavLink
              onClick={handleLinkClick}
              to="/admin/gestion-prix"
              className={({ isActive }) =>
                `px-5 py-3 w-full text-center font-medium transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900  hover:underline hover:translate-[1px] ${
                  isActive ? "underline bg-hover-main dark:bg-gray-900" : ""
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

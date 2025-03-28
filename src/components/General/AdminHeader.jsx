import {
  Code,
  House,
  LogOut,
  MonitorDot,
  PanelsTopLeft,
  Presentation,
  UsersRound,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="bg-main h-screen sticky top-0 left-0 flex flex-col">
      <div className="flex-grow">
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 mb-10 mx-auto"
        />

        <div className="font-medium text-nav font-main w-fit mx-auto">
          <NavLink
            to="/admin/tableau-de-bord"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <House size={32} color="#B04404" />
            <p className="mx-2 text-admin-nav">Accueil</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-pages"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <PanelsTopLeft size={32} color="#232323" />
            <p className="mx-2">Pages</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-équipe"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <UsersRound size={32} color="#232323" />
            <p className="mx-2">Équipe</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-conférences"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <MonitorDot size={32} color="#232323" />
            <p className="mx-2">Conférences</p>
          </NavLink>

          <NavLink
            to="/admin/gestion_projets"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <Presentation size={32} color="#232323" />
            <p className="mx-2">Projets</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-prix"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav"
                  : "bg-none text-black"
              }`
            }
          >
            <Code size={32} color="#232323" />
            <p className="mx-2">Prix</p>
          </NavLink>
        </div>
      </div>

      <NavLink
        to="/admin"
        className={`flex items-center my-5 text-red-text hover:bg-red-bg px-4 py-3 rounded-2xl hover:translate-[1px] font-medium text-nav font-main w-fit mx-auto hover:underline`}
      >
        <LogOut size={32} color="#8B0000" />
        <p className="mx-2">Déconnexion</p>
      </NavLink>
    </header>
  );
};

export default AdminHeader;

import {
  Code,
  House,
  MonitorDot,
  PanelsTopLeft,
  Presentation,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <nav className="bg-main dark:bg-dark-main h-screen sticky top-0 left-0 flex flex-col max-md:hidden">
      <div className="flex-grow">
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 mb-10 mx-auto"
        />

        <div className="font-medium font-main w-fit mx-auto">
          <NavLink
            to="/admin/tableau-de-bord"
            className={({ isActive }) =>
              `flex items-center my-3 px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <House size={32} />
            <p className="mx-2">Accueil</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-pages"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <PanelsTopLeft size={32} />
            <p className="mx-2">Pages</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-equipe"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <UsersRound size={32} />
            <p className="mx-2">Équipe</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-conferences"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <MonitorDot size={32} />
            <p className="mx-2">Conférences</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-projets"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <Presentation size={32} />
            <p className="mx-2">Projets</p>
          </NavLink>

          <NavLink
            to="/admin/gestion-prix"
            className={({ isActive }) =>
              `flex items-center my-3  px-4 py-3 rounded-2xl hover:translate-[1px] hover:underline mx-7 ${
                isActive
                  ? "bg-admin-nav-bg text-admin-nav dark:text-black"
                  : "bg-none text-black dark:text-gray-300"
              }`
            }
          >
            <Code size={32} />
            <p className="mx-2">Prix</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;

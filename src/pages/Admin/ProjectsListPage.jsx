import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProjectsListPage = () => {
  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion des projets</h1>

        <Link
          to="/admin/gestion-projets/ajouter-projet"
          className="hover:translate-[1px] cursor-pointer mx-4"
        >
          <Plus
            aria-label="Ajouter un projet"
            size={36}
            className="text-[#232323] dark:text-gray-300"
            strokeWidth={2.8}
          />
        </Link>
      </div>

      <div></div>
    </main>
  );
};

export default ProjectsListPage;

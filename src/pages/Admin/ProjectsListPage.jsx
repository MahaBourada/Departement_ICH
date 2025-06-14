import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const ProjectsListPage = () => {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idProjet) => {
    try {
      setProjects((prev) =>
        prev.filter((project) => project.idProjet !== idProjet)
      );

      await api.delete(`projects/${idProjet}`);
    } catch (error) {
      console.error(error);
    }
  };

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

      {projects.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucun projet enregistré</h2>
        </div>
      )}

      <table className="w-full mx-3 my-5">
        <caption className="sr-only">
          Liste des projets avec année et membres
        </caption>
        <thead>
          <tr className="border-b-[0.5px] text-start">
            <th className="py-3 text-start w-1/6">Projet</th>
            <th className="py-3 text-start w-1/6">Année</th>
            <th className="py-3 text-start w-2/3">Membres</th>
            <th className="py-3 text-start w-1/2">Opérations</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.idProjet} className="border-b-[0.5px]">
              <td className="py-3 text-start">
                <p className="line-clamp-1">{project.titre}</p>
              </td>
              <td className="py-3 text-start">{project.annee}</td>
              <td className="py-3 text-start">
                <p className="line-clamp-1">
                  {project.membres.map((membre, index) => (
                    <span key={index}>
                      {membre.prenom + " " + membre.nom.toUpperCase()}
                      {project.membres.length - 1 === index ? "" : ", "}
                    </span>
                  ))}
                </p>
              </td>
              <td className="h-full px-4">
                <div className="flex items-center justify-center space-x-2">
                  <Link
                    to={`/admin/gestion-projets/${project.idProjet}`}
                    type="button"
                    className="cursor-pointer hover:translate-[1px] mr-1"
                  >
                    <Pencil
                      aria-label="Mettre à jour un projet"
                      size={26}
                      className="text-[#232323] dark:text-gray-300"
                    />
                  </Link>
                  <button
                    type="button"
                    className="cursor-pointer hover:translate-[1px] ml-1"
                    onClick={() => handleDelete(project.idProjet)}
                  >
                    <Trash2
                      aria-label="Supprimer un projet"
                      size={26}
                      className="text-[#8B0000] dark:text-red-400"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ProjectsListPage;

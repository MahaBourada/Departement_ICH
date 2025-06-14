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
          onClick={() => window.scrollTo({ top: 0 })}
          to="/admin/gestion-projets/ajouter-projet"
          className="flex flex-row items-center cursor-pointer bg-accent dark:bg-dark-accent text-black font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:bg-dark-accent max-md:w-42 max-md:mx-3 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter un projet"
            size={30}
            className="text-[#232323] mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter un projet</p>
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
                    onClick={() => window.scrollTo({ top: 0 })}
                    to={`/admin/gestion-projets/${project.idProjet}`}
                    type="button"
                    className="cursor-pointer mr-2 p-0.5 rounded-md hover:bg-neutral-300"
                  >
                    <Pencil
                      aria-label={`Mettre à jour le projet ${project.titre}`}
                      size={30}
                      className="text-[#232323] dark:text-gray-300"
                    />
                  </Link>
                  <button
                    type="button"
                    className="cursor-pointer ml-2 p-0.5 rounded-md hover:bg-neutral-300"
                    onClick={() => handleDelete(project.idProjet)}
                  >
                    <Trash2
                      aria-label={`Supprimer le projet ${project.titre}`}
                      size={30}
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

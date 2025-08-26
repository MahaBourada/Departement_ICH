import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { ConfirmationModal, MessagePopup } from "../../../components/MsgPopup";
import { UserContext } from "../../../contexts/UserContext";

const ProjectsListPage = () => {
  const currentAdmin = useContext(UserContext).user;
  const [projects, setProjects] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = (project) => {
    setSelectedProject(project);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/projects/${selectedProject.idProjet}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
          withCredentials: true,
          params: {
            currentAdmin: currentAdmin,
          },
        }
      );

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);

      setProjects((prev) =>
        prev.filter((project) => project.idProjet !== selectedProject.idProjet)
      );
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message ||
        "Une erreur est survenue. Veuillez réessayer.";

      setMsgStatus(0);
      setMsg(backendMsg);
      setMsgShow(true);
    } finally {
      setConfirmOpen(false);
      setSelectedProject(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedProject(null);
  };

  return (
    <main className="mx-14 my-20">
      <title>Gestion des projets - Espace Admin</title>

      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion des projets</h1>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/admin/gestion-projets/ajouter-projet"
          className="flex flex-row items-center font-main dyslexiaTheme:font-dyslexia font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter un projet"
            size={30}
            className="text-black dark:text-dark-white mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter un projet</p>
        </Link>
      </div>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      {projects.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucun projet enregistré</h2>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={cancelDeletion}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer le projet ${
          selectedProject?.titre || ""
        } ?`}
      />

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
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to={`/admin/gestion-projets/${project.idProjet}`}
                    type="button"
                    className="cursor-pointer mr-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                  >
                    <Pencil
                      aria-label={`Mettre à jour le projet ${project.titre}`}
                      size={30}
                      className="text-[#232323] dark:text-gray-300"
                    />
                  </Link>
                  <button
                    type="button"
                    className="cursor-pointer ml-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    onClick={() => handleConfirmDelete(project)}
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

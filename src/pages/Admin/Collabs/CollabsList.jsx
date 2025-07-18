import React, { useContext, useEffect, useState } from "react";
import { ConfirmationModal, MessagePopup } from "../../../components/MsgPopup";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import api from "../../../api/api";
import { UserContext } from "../../../contexts/UserContext";

const CollabsList = () => {
  const currentAdmin = useContext(UserContext).user;
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [collabs, setCollabs] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState(null);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("collaborations");

      setCollabs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = (collab) => {
    setSelectedCollab(collab);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      setCollabs((prev) =>
        prev.filter((collab) => collab.idCollab !== selectedCollab.idCollab)
      );

      const response = await api.delete(
        `/collaborations/${selectedCollab.idCollab}`,
        {
          params: {
            currentAdmin: currentAdmin,
          },
        }
      );

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmOpen(false);
      setSelectedCollab(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedCollab(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion des collaborations</h1>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/admin/gestion-collaborations/ajouter-collaboration"
          className="flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter un projet"
            size={30}
            className="text-black dark:text-dark-white mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter une collaboration</p>
        </Link>
      </div>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      {collabs.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucune collaboration enregistré</h2>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={cancelDeletion}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer la collaboration ${
          selectedCollab?.nom || ""
        } ?`}
      />

      {collabs.length > 0 && (
        <table className="w-full mx-3 my-5">
          <caption className="sr-only">
            Liste des collaborations nationales et internationales
          </caption>
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start w-2/6">Collab</th>
              <th className="py-3 text-start w-2/6">Type</th>
              <th className="py-3 text-start w-2/6">Catégorie</th>
              <th className="py-3 text-start w-1/2">Opérations</th>
            </tr>
          </thead>
          <tbody>
            {collabs.map((collab) => (
              <tr key={collab.idCollab} className="border-b-[0.5px]">
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{collab.nom}</p>
                </td>
                <td className="py-3 text-start">{collab.type}</td>
                <td className="py-3 text-start">{collab.categorie}</td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      to={`/admin/gestion-collaborations/${collab.idCollab}`}
                      type="button"
                      className="cursor-pointer mr-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                      <Pencil
                        aria-label={`Mettre à jour la collaboration ${collab.nom}`}
                        size={30}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer ml-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={() => handleConfirmDelete(collab)}
                    >
                      <Trash2
                        aria-label={`Supprimer le projet ${collab.nom}`}
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
      )}
    </main>
  );
};

export default CollabsList;

import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { ConfirmationModal, MessagePopup } from "../../../components/MsgPopup";
import { UserContext } from "../../../contexts/UserContext";

const PrixListPage = () => {
  const currentAdmin = useContext(UserContext).user;
  const [prix, setPrix] = useState([]); // List of json objects
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPrix, setSelectedPrix] = useState({});

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/prix");
      setPrix(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = (onePrix) => {
    setSelectedPrix(onePrix);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/prix/${selectedPrix.idPrix}`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
        withCredentials: true,
        params: {
          currentAdmin: currentAdmin,
        },
      });

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);

      setPrix((prev) =>
        prev.filter((onePrix) => onePrix.idPrix !== selectedPrix.idPrix)
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
      setSelectedPrix(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedPrix(null);
  };

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion des prix & concours</h1>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/admin/gestion-prix/ajouter-prix"
          className="flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter un prix"
            size={30}
            className="text-black dark:text-dark-white mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter un prix</p>
        </Link>
      </div>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      {prix.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucun prix enregistré</h2>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={cancelDeletion}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer ${
          selectedPrix?.nom || ""
        }?`}
      />

      {prix.length > 0 && (
        <table className="w-full mx-3 my-5">
          <caption className="sr-only">Liste des prix & concours</caption>
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start w-[20%]">Nom</th>
              <th className="py-3 text-start w-[20%]">Organisation</th>
              <th className="py-3 text-start w-[20%]">Projet</th>
              <th className="py-3 text-start w-[28%]">Étudiant.s</th>
              <th className="py-3 text-start w-1/2">Opérations</th>
            </tr>
          </thead>
          <tbody>
            {prix.map((onePrix) => (
              <tr key={onePrix.idPrix} className="border-b-[0.5px]">
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{onePrix.nom}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{onePrix.organisation}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{onePrix.projet}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{onePrix.etudiants}</p>
                </td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      to={`/admin/gestion-prix/${onePrix.idPrix}`}
                      type="button"
                      className="cursor-pointer mr-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                      <Pencil
                        aria-label={`Mettre à jour ${onePrix.nom}`}
                        size={30}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer ml-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={() => handleConfirmDelete(onePrix)}
                    >
                      <Trash2
                        aria-label={`Supprimer ${onePrix.nom}`}
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

export default PrixListPage;

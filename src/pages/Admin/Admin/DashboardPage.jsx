import { Pencil, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import {
  ConfirmationModal,
  MessagePopup,
} from "../../../components/MsgPopup.jsx";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { exportCSV } from "../../../utils/exportCSV.js";
import { exportTXT } from "../../../utils/exportTXT.js";

const DashboardPage = () => {
  const currentAdmin = useContext(UserContext).user;
  const [adminList, setAdminList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const fetchData = async () => {
    try {
      const adminResponse = await api.get("/admin");

      setAdminList(adminResponse.data);

      const historyResponse = await api.get("/history");

      setHistoryList(historyResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleConfirmDelete = (admin) => {
    setSelectedAdmin(admin);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      setAdminList((prev) =>
        prev.filter((admin) => admin.idAdmin !== selectedAdmin.idAdmin)
      );

      const response = await api.delete(`/admin/${selectedAdmin.idAdmin}`, {
        params: {
          currentAdmin: currentAdmin,
        },
      });

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmOpen(false);
      setSelectedAdmin(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="my-20">
      <main className="mx-14 max-md:mx-4">
        <div className="flex items-center justify-between">
          <h1 className="text-display font-semibold">
            Comptes administrateurs
          </h1>

          <Link
            to="/admin/tableau-de-bord/ajouter-admin"
            className="flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
          >
            <Plus
              aria-label="Ajouter un admin"
              size={30}
              className="text-black dark:text-dark-white mr-2"
              strokeWidth={2.8}
            />
            <p>Ajouter un admin</p>
          </Link>
        </div>

        {msgShow && (
          <MessagePopup
            message={msg}
            onClose={handleClose}
            status={msgStatus}
          />
        )}

        <ConfirmationModal
          isOpen={confirmOpen}
          onCancel={cancelDeletion}
          onConfirm={handleDelete}
          message={`Êtes-vous sûr de vouloir supprimer l'administrateur ${
            selectedAdmin?.first_name || ""
          } ${
            selectedAdmin?.last_name
              ? selectedAdmin.last_name.toUpperCase()
              : ""
          }?`}
        />

        {adminList.length === 0 && (
          <div className="m-auto w-fit mt-20 text-3xl font-medium">
            <h2>Aucun administrateur enregistré</h2>
          </div>
        )}

        {adminList.length > 0 && (
          <table className="w-full mx-3 my-5">
            <caption className="sr-only">
              Liste des administrateurs du site
            </caption>
            <thead>
              <tr className="border-b-[0.5px] text-start">
                <th className="py-3 text-start w-1/3">Admin</th>
                <th className="py-3 text-start w-1/3">Nom d'utilisateur</th>
                <th className="py-3 text-start w-1/4">Créé le</th>
                <th className="py-3 text-start w-fit">Opérations</th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin) => (
                <tr key={admin.idAdmin} className="border-b-[0.5px]">
                  <td className="py-3 text-start">
                    <p className="line-clamp-1">
                      {admin.first_name + " " + admin.last_name.toUpperCase()}
                    </p>
                  </td>
                  <td className="py-3 text-start">
                    <p className="line-clamp-1">{admin.username}</p>
                  </td>
                  <td className="py-3 text-start">{admin.createdAt}</td>
                  <td className="h-full px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        to={`/admin/tableau-de-bord/gestion-admin/${admin.idAdmin}`}
                        type="button"
                        className="cursor-pointer mr-2 p-0.5 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      >
                        <Pencil
                          aria-label="Mettre à jour un admin"
                          size={30}
                          className="text-[#232323] dark:text-gray-300"
                        />
                      </Link>
                      <button
                        type="button"
                        className="cursor-pointer ml-2 p-0.5 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        onClick={() => handleConfirmDelete(admin)}
                      >
                        <Trash2
                          aria-label={`Supprimer ${
                            admin.first_name
                          } ${admin.last_name.toUpperCase()}`}
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

        <aside className="mt-20">
          <div className="flex items-center justify-between">
            <h1 className="text-display font-semibold">Historique</h1>

            <div className="flex flex-row items-center">
              <button
                onClick={() => exportCSV(historyList, "historique.csv")}
                className="cursor-pointer flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
              >
                Exporter en fichier CSV
              </button>

              <button
                onClick={() => exportTXT(historyList, "historique.txt")}
                className="cursor-pointer flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
              >
                Exporter en fichier TXT
              </button>
            </div>
          </div>

          {historyList.length === 0 && (
            <div className="m-auto w-fit mt-20 text-3xl font-medium">
              <h2>Aucun historique enregistré</h2>
            </div>
          )}

          {historyList.length > 0 && (
            <table className="w-full mx-3 my-5">
              <caption className="sr-only">
                Historique des changements du site
              </caption>
              <thead>
                <tr className="border-b-[0.5px] text-start">
                  <th className="py-3 text-start w-1/5">Admin</th>
                  <th className="py-3 text-start w-1/2">Résumé</th>
                  <th className="py-3 text-start w-1/5">Date</th>
                  <th className="py-3 text-start w-1/3">Opérations</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((history) => (
                  <tr key={history.idHistory} className="border-b-[0.5px]">
                    <td className="py-3 text-start">
                      <p className="line-clamp-1">{history.admin_name}</p>
                    </td>
                    <td className="py-3 text-start">
                      <p className="line-clamp-1">{history.resume}</p>
                    </td>
                    <td className="py-3 text-start">{history.dateUpdated}</td>
                    <td className="py-3 text-center">
                      <p className="line-clamp-1">{history.operation}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </aside>
      </main>
    </div>
  );
};

export default DashboardPage;

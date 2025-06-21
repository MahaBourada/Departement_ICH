import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import {
  ConfirmationModal,
  MessagePopup,
} from "../../../components/MsgPopup.jsx";

const DashboardPage = () => {
  const [adminList, setAdminList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/admin");

      setAdminList(response.data);
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

      const response = await api.delete(`/admin/${selectedAdmin.idAdmin}`);

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
    <div className="mt-20">
      <main className="mx-14 max-md:mx-4">
        <div className="flex items-center justify-between">
          <h1 className="text-display font-semibold ">
            Comptes administrateurs
          </h1>

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

          <Link
            to="/admin/tableau-de-bord/ajouter-admin"
            className="flex flex-row items-center cursor-pointer bg-accent dark:bg-dark-accent text-black font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:bg-dark-accent max-md:w-42 max-md:mx-3 text-nav leading-normal"
          >
            <Plus
              aria-label="Ajouter un admin"
              size={30}
              className="text-[#232323] mr-2"
              strokeWidth={2.8}
            />
            <p>Ajouter un admin</p>
          </Link>
        </div>

        <table className="w-full mx-3 my-5">
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start w-1/4">Admin</th>
              <th className="py-3 text-start w-1/4">Nom d'utilisateur</th>
              <th className="py-3 text-start w-1/4">Rôle</th>
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
                <td className="py-3 text-start">{admin.type}</td>
                <td className="py-3 text-start">
                  {new Date(admin.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      to={`/admin/tableau-de-bord/gestion-admin/${admin.idAdmin}`}
                      type="button"
                      className="cursor-pointer mr-2 p-0.5 rounded-md hover:bg-neutral-300"
                    >
                      <Pencil
                        aria-label="Mettre à jour un admin"
                        size={30}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer ml-2 p-0.5 rounded-md hover:bg-neutral-300"
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
        {/* <aside>
          <div>
            <h1 className="text-dynamic-2xl max-md:text-dynamic-xl font-semibold">
              Historique
            </h1>

            <div className="mx-3">
              <div className="flex justify-between items-center my-3">
                <p>Isis TRUCK</p>
                <p>01/04/2025</p>
                <p>20:35</p>
              </div>

              <div className="h-[0.5px] bg-black my-1 w-full"></div>

              <div className="flex justify-between items-center my-3">
                <p>Anis ROJBI</p>
                <p>01/04/2025</p>
                <p>20:35</p>
              </div>

              <div className="h-[0.5px] bg-black my-1 w-full"></div>

              <div className="flex justify-between items-center my-3">
                <p>Céline JOST</p>
                <p>01/04/2025</p>
                <p>20:35</p>
              </div>

              <div className="h-[0.5px] bg-black my-1 w-full"></div>
            </div>

            <div className="w-fit ml-auto mt-2 font-semibold">
              <button className="mr-2 p-2 cursor-pointer hover:underline hover:translate-[1px]">
                Voir plus
              </button>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-dynamic-2xl max-md:text-dynamic-xl font-semibold">
              Newsletter
            </h1>

            <div className="mx-3">
              <h2></h2>
            </div>
          </div>
        </aside> */}
      </main>
    </div>
  );
};

export default DashboardPage;

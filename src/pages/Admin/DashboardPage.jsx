import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";

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

  const handleDelete = async (idAdmin) => {
    try {
      setAdminList((prevAdminList) =>
        prevAdminList.filter((admin) => admin.idAdmin !== idAdmin)
      );

      const response = await api.delete(`/admin/${idAdmin}`);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
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

          <Link
            to="/admin/tableau-de-bord/add-admin"
            className="hover:translate-[1px] cursor-pointer mx-4"
          >
            <Plus
              aria-label="Ajouter un admin"
              size={36}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={2.8}
            />
          </Link>
        </div>

        <table className="w-full mx-3 my-5">
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start">Utilisateur</th>
              <th className="py-3 text-start">Rôle</th>
              <th className="py-3 text-start">Créé le</th>
              <th className="py-3 text-start">Opérations</th>
            </tr>
          </thead>
          <tbody>
            {adminList.map((admin) => (
              <tr key={admin.idAdmin} className="border-b-[0.5px]">
                <td className="py-3 text-start">
                  {admin.first_name + " " + admin.last_name.toUpperCase()}
                </td>
                <td className="py-3 text-start">{admin.type}</td>
                <td className="py-3 text-start">
                  {new Date(admin.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 w-fit mx-auto">
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      className="cursor-pointer hover:translate-[1px] mr-1"
                    >
                      <Pencil
                        aria-label="Mettre à jour un admin"
                        size={26}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer hover:translate-[1px] ml-1"
                      onClick={() => handleDelete(admin.idAdmin)}
                    >
                      <Trash2
                        aria-label="Supprimer un admin"
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
              <h2>Meow</h2>
            </div>
          </div>
        </aside> */}
      </main>
    </div>
  );
};

export default DashboardPage;

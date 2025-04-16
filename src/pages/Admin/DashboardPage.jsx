import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

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

  const handleDelete = async (idAdmin) => {
    try {
      setAdminList((prevAdminList) =>
        prevAdminList.filter((admin) => admin.idAdmin !== idAdmin)
      );

      await api.delete(`/admin/${idAdmin}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-20">
      <main className="mx-14">
        <div className="flex items-center justify-between">
          <h1 className="text-display font-semibold ">
            Comptes administrateurs
          </h1>

          <Link
            to="/admin/tableau-de-bord/add-admin"
            className="hover:translate-[1px] cursor-pointer mx-4"
          >
            <Plus size={36} color="#232323" strokeWidth={2.8} />
          </Link>
        </div>

        <table className="w-full mx-5">
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start">Utilisateur</th>
              <th className="py-3 text-start">Rôle</th>
              <th className="py-3 text-start">Créé le</th>
              <th className="py-3 text-start">Options</th>
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
                      <Pencil size={26} color="#232323" />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer hover:translate-[1px] ml-1"
                      onClick={() => handleDelete(admin.idAdmin)}
                    >
                      <Trash2 size={26} color="#8B0000" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <aside>
          <div>
            <h1 className="text-display font-semibold">Historique</h1>

            <div>
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

            <div className="w-fit ml-auto mt-2 hover:underline hover:translate-[1px] font-semibold">
              <Link to="/admin/tableau-de-bord/historique">Voir plus</Link>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-display font-semibold">Newsletter</h1>

            <div>
              <h2>Meow</h2>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default DashboardPage;

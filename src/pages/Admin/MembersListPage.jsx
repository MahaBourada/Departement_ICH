import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";

const MembersListPage = () => {
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (idMembre) => {
    try {
      setMembers((prev) =>
        prev.filter((member) => member.idMembre !== idMembre)
      );

      const response = await api.delete(`members/${idMembre}`);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion de l'équipe du département</h1>

        <Link
          to="/admin/gestion-equipe/ajouter-membre"
          className="hover:translate-[1px] cursor-pointer mx-4"
        >
          <Plus
            aria-label="Ajouter un membre"
            size={36}
            className="text-[#232323] dark:text-gray-300"
            strokeWidth={2.8}
          />
        </Link>
      </div>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      {members.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucun membre enregistré</h2>
        </div>
      )}

      {members.length > 0 && (
        <table className="w-full mx-3 my-5">
          <caption className="sr-only">
            Liste des membres de l'équipe du département
          </caption>
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start w-[28%]">Membre</th>
              <th className="py-3 text-start w-[20%]">Titre</th>
              <th className="py-3 text-start w-[27%]">Fonction</th>
              <th className="py-3 text-start w-[20%]">Section</th>
              <th className="py-3 text-start w-1/2">Opérations</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.idMembre} className="border-b-[0.5px]">
                <td className="py-3 text-start">
                  <p className="line-clamp-1">
                    {member.prenom + " " + member.nom.toUpperCase()}
                  </p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{member.titre}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{member.fonction}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{member.section}</p>
                </td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      to={`/admin/gestion-equipe/${member.idMembre}`}
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
                      onClick={() => handleDelete(member.idMembre)}
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
      )}
    </main>
  );
};

export default MembersListPage;

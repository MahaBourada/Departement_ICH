import { Pencil, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { ConfirmationModal, MessagePopup } from "../../../components/MsgPopup";
import { UserContext } from "../../../contexts/UserContext";

const MembersListPage = () => {
  const currentAdmin = useContext(UserContext).user;
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});

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

  const handleConfirmDelete = (member) => {
    setSelectedMember(member);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      setMembers((prev) =>
        prev.filter((member) => member.idMembre !== selectedMember.idMembre)
      );

      const response = await api.delete(`/members/${selectedMember.idMembre}`, {
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
      setSelectedMember(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedMember(null);
  };

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion de l'équipe du département</h1>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/admin/gestion-equipe/ajouter-membre"
          className="flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter un membre"
            size={30}
            className="text-black dark:text-dark-white mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter un membre</p>
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

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={cancelDeletion}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer ${
          selectedMember?.prenom || ""
        } ${selectedMember?.nom ? selectedMember.nom.toUpperCase() : ""}?`}
      />

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
                  <p className="line-clamp-1">{member.fonction_fr}</p>
                </td>
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{member.section_fr}</p>
                </td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      to={`/admin/gestion-equipe/${member.idMembre}`}
                      type="button"
                      className="cursor-pointer mr-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                      <Pencil
                        aria-label={`Mettre à jour ${
                          member.prenom
                        } ${member.nom.toUpperCase()}`}
                        size={30}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer ml-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={() => handleConfirmDelete(member)}
                    >
                      <Trash2
                        aria-label={`Supprimer ${
                          member.prenom
                        } ${member.nom.toUpperCase()}`}
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

export default MembersListPage;

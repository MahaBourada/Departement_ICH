import { Pencil, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { ConfirmationModal, MessagePopup } from "../../../components/MsgPopup";
import { UserContext } from "../../../contexts/UserContext";

const NewsListPage = () => {
  const currentAdmin = useContext(UserContext).user;
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    localStorage.setItem("lang", "fr");
    try {
      const response = await api.get("/news");
      setNews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = (news) => {
    setSelectedNews(news);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/news/${selectedNews.idActu}`, {
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

      setNews((prev) =>
        prev.filter((news) => news.idActu !== selectedNews.idActu)
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
      setSelectedNews(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmOpen(false);
    setSelectedNews(null);
  };

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="font-semibold ">Gestion des actualités</h1>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/admin/gestion-actualites/ajouter-actualite"
          className="flex flex-row items-center font-main font-medium rounded-xl px-5 py-2 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          <Plus
            aria-label="Ajouter une actualité"
            size={30}
            className="text-black dark:text-dark-white mr-2"
            strokeWidth={2.8}
          />
          <p>Ajouter une actu</p>
        </Link>
      </div>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      {news.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucune actualité enregistrée</h2>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={cancelDeletion}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer l'actualité ${
          selectedNews?.titre_fr || ""
        } ?`}
      />

      {news.length > 0 && (
        <table className="w-full mx-3 my-5">
          <caption className="sr-only">Liste des actualités</caption>
          <thead>
            <tr className="border-b-[0.5px] text-start">
              <th className="py-3 text-start w-3/6">Actualité</th>
              <th className="py-3 text-start">Date postée</th>
              <th className="py-3 text-start">Date mise à jour</th>
              <th className="py-3 text-start">Opérations</th>
            </tr>
          </thead>
          <tbody>
            {news.map((oneNews) => (
              <tr key={oneNews.idActu} className="border-b-[0.5px]">
                <td className="py-3 text-start">
                  <p className="line-clamp-1">{oneNews.titre_fr}</p>
                </td>
                <td className="py-3 text-start">{oneNews.datePosted}</td>
                <td className="py-3 text-start">
                  {oneNews.dateUpdated ? oneNews.dateUpdated : "/"}
                </td>
                <td className="h-full px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      to={`/admin/gestion-actualites/${oneNews.idActu}`}
                      type="button"
                      className="cursor-pointer mr-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                      <Pencil
                        aria-label={`Mettre à jour l'actualité' ${oneNews.titre_fr}`}
                        size={30}
                        className="text-[#232323] dark:text-gray-300"
                      />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer ml-2 p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={() => handleConfirmDelete(oneNews)}
                    >
                      <Trash2
                        aria-label={`Supprimer le projet ${oneNews.titre_fr}`}
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

export default NewsListPage;

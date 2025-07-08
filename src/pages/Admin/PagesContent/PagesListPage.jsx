import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";

const PagesListPage = () => {
  const [pages, setPages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("pages");
      setPages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1 className="text-dynamic-2xl font-semibold mx-14 mt-20">
        Gestion des pages
      </h1>

      <div className="grid grid-cols-2 max-large-medium:grid-cols-1 mx-14 my-4">
        {pages.map((page, index) => (
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label={`Mettre à jour la ${page.title}`}
            key={index}
            to={`/admin/gestion-pages/${page.idPage}`}
            className="mx-4 my-2 bg-admin-nav-bg dark:bg-[#83421F] p-6 rounded-3xl hover:bg-accent hover:underline dark:hover:bg-[#693214]"
          >
            <div className=" flex justify-between items-center font-main font-medium ">
              <p>{page.title}</p>
              <Pencil size={26} className="text-[#232323] dark:text-gray-300" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default PagesListPage;

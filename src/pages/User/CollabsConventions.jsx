import { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import Pagination from "../../components/Pagination";

const CollabsConventions = () => {
  const { t } = useTranslation();
  const [collabs, setCollabs] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const collabsResponse = await api.get(
        `/collaborations/content?type=nationale&lang=${lang}`
      );

      setCollabs(collabsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCollabs = collabs.filter(
    (collab) =>
      collab.type === "Nationale" &&
      ["Autre", "Hôpital", "Université"].includes(collab.categorie)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollabs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCollabs.length / itemsPerPage);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: "Collaborations",
          },
          {
            label: t("collaboration.national.title"),
            link: "/collaborations/collaborations-nationales",
          },
          {
            label: t("collaboration.national.conventions"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("collaboration.national.conventions")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        {currentItems
          .filter(
            (collab) =>
              collab.type === "Nationale" &&
              (collab.categorie === "Autre" ||
                collab.categorie === "Hôpital" ||
                collab.categorie === "Université")
          )
          .map((collab, index) => (
            <div key={index}>
              <div className="flex items-start justify-between my-10">
                <div>
                  <h3 className="text-dynamic-lg font-semibold">
                    {collab.nom}
                  </h3>

                  <ReactMarkdown
                    className="markdown mx-2"
                    children={String(collab.description)}
                  />

                  {collab.categorie !== "Autre" && (
                    <p className="mx-2 mt-7">
                      <strong className="font-medium">
                        {t("collaboration.categories.label")} :{" "}
                      </strong>

                      {t(
                        `collaboration.categories.${collab.categorie}`
                      )}
                    </p>
                  )}
                </div>

                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${collab.logo}`}
                  alt={`Logo de l'organisation ${collab.nom}`}
                  className="w-60 my-auto dark:bg-neutral-400 p-2.5 px-3 rounded-2xl"
                />
              </div>
              <div className="border-neutral-500 dark:border-gray-300 border-[1px] my-5 w-full"></div>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </main>
  );
};

export default CollabsConventions;

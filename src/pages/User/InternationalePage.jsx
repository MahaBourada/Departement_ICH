import { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import Pagination from "../../components/Pagination";
import { House } from "lucide-react";

const InternationalePage = () => {
  const { t } = useTranslation();
  const [pageInternational, setPageInternational] = useState([]);
  const [images, setImages] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/title/collaboration-internationale?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/title/collaboration-internationale?lang=${lang}`
      );

      const collabsResponse = await api.get(
        `/collaborations/content?type=internationale&lang=${lang}`
      );

      setPageInternational(contentResponse.data);
      setImages(imagesResponse.data);
      setCollabs(collabsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  const img1 = getByPosition(images, 1);

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collabs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(collabs.length / itemsPerPage);

  return (
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: (
              <span className="flex flex-row items-center gap-x-2">
                <House size={26} strokeWidth={2.2} />
                {t("home.link")}
              </span>
            ),
          },
          {
            label: "Collaborations",
          },
          {
            label: t("collaboration.international.title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("collaboration.international.title")}
      </h1>

      <div className="my-5 mb-20 mx-5 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        {pageInternational[0]?.texte && (
          <ReactMarkdown
            className={`my-3 minimal:mx-0 markdown`}
            children={String(pageInternational[0]?.texte)}
          />
        )}

        {img1.path && (
          <div className="flex flex-col items-center justify-start mt-10 my-auto">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
              alt={img1.alt || ""}
              width={400}
              className="minimal:hidden w-3/4 max-large:w-fit m-auto my-5 max-large-medium:mx-auto max-large-medium:mb-6"
            />

            {img1?.source && (
              <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit mx-auto max-w-full break-words whitespace-normal">
                <span className="font-semibold">Source :</span> {img1.source}
              </p>
            )}
          </div>
        )}

        {pageInternational[1]?.texte && (
          <ReactMarkdown
            className="markdown"
            children={String(pageInternational[1]?.texte)}
          />
        )}
      </div>

      <div className="border-neutral-500 dark:border-gray-300 border-[1px] my-5 w-full"></div>

      {currentItems.map((collab, index) => (
        <div key={index}>
          <div className="flex flex-row max-sm:flex-col items-start justify-between my-10">
            <div>
              <h2 className="text-dynamic-lg font-semibold">{collab.nom}</h2>

              <ReactMarkdown
                className="markdown mx-2"
                children={String(collab.description)}
              />

              {collab.categorie !== "Autre" && (
                <p className="mx-2 mt-7">
                  <strong className="font-medium">
                    {t("collaboration.categories.label")} :{" "}
                  </strong>
                  {t(`collaboration.categories.${collab.categorie}`)}
                </p>
              )}
            </div>

            <img
              src={`${import.meta.env.VITE_BASE_URL}/${collab.logo}`}
              alt={`Logo de l'organisation ${collab.nom}`}
              className="w-60 my-auto max-sm:mt-8 max-sm:w-fit"
            />
          </div>
          <div className="border-neutral-500 dark:border-gray-300 border-[1px] my-5 w-full"></div>
        </div>
      ))}

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

export default InternationalePage;

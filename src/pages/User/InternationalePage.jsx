import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import Pagination from "../../components/Pagination";

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
      set;
    } catch (error) {
      console.error(error);
    }
  };

  function getByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  const img1 = getByPosition(images, 1);
  const img2 = getByPosition(images, 2);

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
            label: t("collaboration.international.title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
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
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
            alt={img1.alt || ""}
            width={400}
            className="minimal:hidden w-3/4 m-auto my-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
          />
        )}

        {pageInternational[1]?.texte && (
          <ReactMarkdown
            className="markdown"
            children={String(pageInternational[1]?.texte)}
          />
        )}

        {img2.path && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${img2.path}`}
            alt={img2.alt || ""}
            width={400}
            className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
          />
        )}
      </div>

      {currentItems.map((collab, index) => (
        <div key={index}>
          <div className="flex items-start justify-between my-10">
            <div>
              <h3 className="text-dynamic-lg font-semibold">{collab.nom}</h3>
              <p className="mx-2">{collab.description}</p>
            </div>

            <img
              src={`${import.meta.env.VITE_BASE_URL}/${collab.logo}`}
              alt={`Logo de l'organisation ${collab.nom}`}
              className="w-60 my-auto"
            />
          </div>
          <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      <Link
        onClick={() => window.scrollTo({ top: 0 })}
        to="/collaborations/collaborez-avec-nous"
        className="mx-auto my-10 flex justify-center items-center w-fit cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
      >
        Collaborez avec nous
      </Link>
    </main>
  );
};

export default InternationalePage;

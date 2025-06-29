import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";

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
            link: "/collaboration-nationale",
          },
          {
            label: "Collaborations et conventions",
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        Collaborations et conventions
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        {collabs
          .filter(
            (collab) =>
              collab.type === "Nationale" && collab.categorie === "Autre"
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

        <h2 className="text-dynamic-2xl font-semibold my-7 mt-16">Hôpitaux</h2>
        {collabs
          .filter(
            (collab) =>
              collab.type === "Nationale" && collab.categorie === "Hôpital"
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

        <h2 className="text-dynamic-2xl font-semibold my-7 mt-16">
          Universités
        </h2>
        {collabs
          .filter(
            (collab) =>
              collab.type === "Nationale" && collab.categorie === "Université"
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
      </div>
    </main>
  );
};

export default CollabsConventions;

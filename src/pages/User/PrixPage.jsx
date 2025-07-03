import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ReactMarkdown from "react-markdown";
import api from "../../api/api";

const PrixPage = () => {
  const { t } = useTranslation();
  const [prix, setPrix] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/prix?lang=${lang}`);
      setPrix(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(prix.image);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: t("formation.link"),
          },
          {
            label: t("formation.awards_title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 mb-4">
        {t("formation.awards_title")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

        {prix.map((onePrix) => (
          <div key={onePrix.idPrix}>
            <div className="w-full">
              <div className="flex flex-row items-start justify-between max-large-large:flex-col readerMode:flex-col">
                <div>
                  <h2 className="font-semibold font-main text-dynamic-xl my-2">
                    {onePrix.nom}
                  </h2>

                  <div className="mx-2">
                    <p className="my-2">
                      <span className="font-semibold">Organisation : </span>
                      {onePrix.organisation}
                    </p>

                    <p className="my-2">
                      <span className="font-semibold">Projet : </span>
                      {onePrix.projet}
                    </p>

                    <p className="my-2">
                      <span className="font-semibold">Étudiant.s : </span>
                      {onePrix.etudiants}
                    </p>

                    <p className="my-2">
                      <span className="font-semibold">Catégorie : </span>
                      {onePrix.categorie}
                    </p>

                    <h3 className="font-medium font-main text-dynamic-lg my-2">
                      Description
                    </h3>
                    <ReactMarkdown
                      className="m-2"
                      children={String(onePrix.description)}
                    />

                    <p className="my-2">
                      <span className="font-semibold">Lien : </span>
                      <a
                        href={onePrix.lien}
                        className="p-0.5 hover:bg-main hover:underline rounded-md"
                      >
                        {onePrix.lien}
                      </a>
                    </p>
                  </div>
                </div>

                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${onePrix.image}`}
                  alt={onePrix.alt}
                  width={400}
                  className="mx-4 minimal:hidden max-large-large:my-6 max-large-medium:w-[30rem] max-large-medium:h-[30rem] max-lg:w-64 max-lg:h-64 max-xl:w-60 max-xl:h-60 readerMode:my-4 rounded-3xl "
                />
              </div>
            </div>

            <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PrixPage;

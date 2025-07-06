import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import api from "../../api/api";

const NewsPage = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/news/content?lang=${lang}`);

      setNews(response.data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: t("department.link"),
          },
          {
            label: t("department.news.link"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display readerMode:w-fit readerMode:mx-auto">
        {t("department.news.link")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        {news.length === 0 && (
          <div className="m-auto w-fit my-20 text-3xl font-medium">
            <h2>Aucune actualité enregistrée</h2>
          </div>
        )}

        {news.length > 0 && (
          <>
            <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

            {news.map((oneNews) => (
              <div key={oneNews.idActu}>
                <div className="h-full flex flex-row items-start justify-between my-2">
                  <div className="flex flex-col justify-between">
                    <h2 className="text-dynamic-xl font-semibold">
                      {oneNews.titre}
                    </h2>

                    <p className="m-2">{oneNews.contenu}</p>

                    <p className="m-2">
                      <span className="font-semibold">Lien : </span>
                      <a
                        href={oneNews.lien}
                        target="_blank"
                        className="p-0.5 hover:bg-main hover:underline rounded-md"
                      >
                        {oneNews.lien}
                      </a>
                    </p>

                    <p className="mx-2 mt-4 text-neutral-600">
                      {oneNews.dateUpdated ? (
                        <>
                          <span className="font-semibold">Mise à jour : </span>
                          {oneNews.dateUpdated}
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">Postée : </span>
                          {oneNews.datePosted}
                        </>
                      )}
                    </p>
                  </div>

                  <img
                    src={import.meta.env.VITE_BASE_URL + "/" + oneNews.image}
                    width={400}
                    alt={oneNews.alt}
                    className="my-auto rounded-2xl"
                  />
                </div>

                <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default NewsPage;

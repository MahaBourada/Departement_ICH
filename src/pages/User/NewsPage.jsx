import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useTranslation } from "react-i18next";
import api from "../../api/api";
import { House } from "lucide-react";

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
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
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
            label: t("department.link"),
          },
          {
            label: t("department.news.link"),
          },
        ]}
      />

      <h1 className="font-main dyslexiaTheme:font-dyslexia font-semibold text-display max-sm:text-header readerMode:w-fit readerMode:mx-auto">
        {t("department.news.link")}
      </h1>

      <div className="mx-4 max-sm:mx-0 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
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
                <div className="h-full flex flex-row readerMode:flex-col max-sm:flex-col items-start justify-between my-2">
                  <div className="flex flex-col justify-between">
                    <h2 className="text-dynamic-xl font-semibold">
                      {oneNews.titre}
                    </h2>

                    <p className="m-2 max-sm:mx-0">{oneNews.contenu}</p>

                    {oneNews.lien && (
                      <p className="m-2 max-sm:mx-0">
                        <span className="font-semibold">{t("website")} : </span>
                        <a
                          href={oneNews.lien}
                          target="_blank"
                          className="p-0.5 transition-colors duration-300 hover:bg-main dark:hover:bg-dark-accent hover:underline rounded-md"
                        >
                          {oneNews.lien}
                        </a>
                      </p>
                    )}

                    <p className="mx-2 max-sm:mx-0 mt-4 max-sm:mt-1 text-neutral-600 dark:text-neutral-300">
                      {oneNews.dateUpdated ? (
                        <>
                          <span className="font-semibold">
                            {t("updated")} :{" "}
                          </span>
                          {oneNews.dateUpdated}
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">
                            {t("posted")} :{" "}
                          </span>
                          {oneNews.datePosted}
                        </>
                      )}
                    </p>
                  </div>

                  {oneNews.image && (
                    <div className="flex flex-col items-end readerMode:items-center justify-start mt-10 my-auto max-sm:w-full">
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL + "/" + oneNews.image
                        }
                        alt={oneNews.alt}
                        width={500}
                        className="my-auto rounded-2xl readerMode:w-3/4"
                      />

                      {oneNews?.source_image && (
                        <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto max-w-full break-words whitespace-normal">
                          <span className="font-semibold">Source :</span>{" "}
                          {oneNews.source_image}
                        </p>
                      )}
                    </div>
                  )}
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

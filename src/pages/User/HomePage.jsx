import { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { House } from "lucide-react";

const HomePage = () => {
  const { t } = useTranslation();
  const [pageAccueil, setPageAccueil] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/title/accueil?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/title/accueil?lang=${lang}`
      );

      setPageAccueil(contentResponse.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow">
      <div className="h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[url('/ich/assets/images/HomeImage.png')] max-md:hidden">
        <h1
          className="text-white bg-bg-transparent py-6 px-7 max-xl:mx-7 rounded-4xl font-main dyslexiaTheme:font-dyslexia font-semibold text-display max-large-medium:text-header text-center leading-10"
          style={{ textShadow: "2px 2px 5px #333" }}
        >
          {t("home.title.1")}
          <br />
          <br />
          {t("home.title.2")}
        </h1>
      </div>

      <div className="my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10 readerMode:leading-loose readerMode:w-[60ch] max-large-medium:readerMode:w-full readerMode:mx-auto">
        <Breadcrumb
          crumbs={[
            {
              label: (
                <span className="flex flex-row items-center gap-x-2">
                  <House size={26} strokeWidth={2.2} />
                  {t("home.link")}
                </span>
              ),
            },
          ]}
        />

        <h1 className="sr-only">
          {t("home.title.1")}
          <br />
          <br />
          {t("home.title.2")}
        </h1>

        <ReactMarkdown
          className="my-7 mt-10 markdown"
          children={String(pageAccueil[0]?.texte)}
        />

        <div className="flex flex-row justify-between items-start max-large:flex-col-reverse readerMode:flex-col-reverse">
          <div className="w-[60%] readerMode:w-full max-large:w-full mr-10 max-lg:mr-5">
            <ReactMarkdown
              className="markdown"
              children={String(pageAccueil[1]?.texte)}
            />

            <ReactMarkdown
              className="markdown my-10"
              children={String(pageAccueil[2]?.texte)}
            />

            <ReactMarkdown
              className="markdown my-10"
              children={String(pageAccueil[3]?.texte)}
            />
          </div>

          {/* Picture 1 */}
          <div className="mx-auto text-center mb-6">
            <div
              className="w-[33rem] h-[33rem] rounded-4xl overflow-hidden mx-auto
               max-sm:w-fit max-sm:h-1/2 
               max-md:w-[26rem] max-md:h-[26rem] 
               max-xl:w-[28rem] max-xl:h-[28rem]
               readerMode:mb-10"
            >
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_BASE_URL}/${
                  getByPosition(images, 1)?.path
                }`}
                alt={getByPosition(images, 1)?.alt || ""}
              />
            </div>

            {getByPosition(images, 1)?.source && (
              <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto">
                <span className="font-semibold">Source :</span>{" "}
                {getByPosition(images, 1).source}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row max-large-medium:flex-col justify-between my-6 readerMode:flex-col">
          {[2, 3, 4].map((pos) => {
            const img = getByPosition(images, pos);
            if (!img?.path) return null;

            const fullPath = img.path.startsWith("uploads/")
              ? `${import.meta.env.VITE_BASE_URL}/${img.path}`
              : img.path;

            return (
              <div
                key={img.idMedia}
                className="flex flex-col items-center space-x-2.5 mx-auto readerMode:my-4"
              >
                <div className="w-[26rem] h-[26rem] max-sm:w-fit max-sm:h-1/2 max-xl:w-fit max-xl:h-fit overflow-hidden">
                  <img
                    src={fullPath}
                    alt={img.alt || ""}
                    width={400}
                    className="w-full h-full object-cover object-center rounded-4xl"
                  />
                </div>

                {img?.source && (
                  <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto">
                    <span className="font-semibold">Source :</span> {img.source}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;

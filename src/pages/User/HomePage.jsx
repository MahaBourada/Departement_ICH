import { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

const HomePage = () => {
  const { t } = useTranslation();
  const [pageAccueil, setPageAccueil] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(`/pages/title/accueil?lang=${lang}`);
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
          className="text-white bg-bg-transparent py-6 px-7 max-xl:mx-7 rounded-4xl font-main font-semibold text-display max-large-medium:text-header text-center leading-10"
          style={{ textShadow: "2px 2px 5px #333" }}
        >
          {t("home.title.1")}
          <br />
          <br />
          {t("home.title.2")}
        </h1>
      </div>

      <div className="my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10 readerMode:leading-loose readerMode:w-[60ch] max-large-medium:readerMode:w-full readerMode:mx-auto">
        <ReactMarkdown
          className="my-7 mt-10 markdown"
          children={String(pageAccueil[0]?.texte)}
        />

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse readerMode:flex-col-reverse">
          <div className="w-[60%] readerMode:w-full max-large-medium:w-full mr-10 max-lg:mr-5">
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

          {/* Picture */}
          <div
            className="w-[33rem] h-[33rem] bg-cover bg-center bg-no-repeat rounded-[50px] mx-auto max-xs:w-80 max-xs:h-80 max-sm:w-96 max-sm:h-96 max-md:w-[26rem] max-md:h-[26rem] max-xl:w-[28rem] max-xl:h-[26rem] max-md:mt-0 max-lg:mt-8 max-large-medium:mb-10 readerMode:mb-10"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 1).path
              })`,
            }}
            alt={getByPosition(images, 1).alt || ""}
          ></div>
        </div>

        <div className="max-sm:hidden flex flex-row max-large-medium:flex-col justify-between my-6 readerMode:flex-col">
          {[2, 3, 4].map((pos) => {
            const img = getByPosition(images, pos);
            if (!img?.path) return null;

            const fullPath = img.path.startsWith("uploads/")
              ? `${import.meta.env.VITE_BASE_URL}/${img.path}`
              : img.path;

            return (
              <img
                key={img.idMedia}
                src={fullPath}
                alt={img.alt || ""}
                width={400}
                className="w-[23rem] h-[23rem] rounded-3xl max-large-medium:w-[26rem] max-large-medium:h-[26rem] max-xl:w-[18rem] max-xl:h-[18rem] mx-auto max-large-medium:mb-6 readerMode:my-4"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InternationalePage = () => {
  const { t } = useTranslation();
  const [pageInternational, setPageInternational] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/collaboration-internationale?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/collaboration-internationale?lang=${lang}`
      );

      setPageInternational(contentResponse.data);
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
    <main className="flex-grow my-10 mb-20 mx-16">
      <nav
        aria-label="breadcrumb"
        className="my-1 mb-5 p-1.5 w-fit rounded-xl flex items-center font-medium"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline hover:translate-[1px]">
          Collaboration
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("collaboration.international.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {t("collaboration.international.title")}
      </h1>

      <div className="my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
        <div
          className="my-7 mt-10"
          dangerouslySetInnerHTML={{ __html: serializeToHtml(pageInternational, 1) }}
        ></div>

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse">
          <div className="w-[60%] minimal:w-full max-large-medium:w-full mr-10 max-lg:mr-5">
            <div
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageInternational, 2),
              }}
            ></div>

            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageInternational, 3),
              }}
            ></div>

            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageInternational, 4),
              }}
            ></div>
          </div>

          {/* Picture */}
          <div
            className="minimal:hidden w-[33rem] h-[33rem] bg-cover bg-center bg-no-repeat rounded-[50px] mx-auto max-xs:w-80 max-xs:h-80 max-sm:w-96 max-sm:h-96 max-md:w-[26rem] max-md:h-[26rem] max-xl:w-[28rem] max-xl:h-[26rem] max-md:mt-0 max-lg:mt-8 max-large-medium:mb-10"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 1).path
              })`,
            }}
            role="img"
            aria-label={getByPosition(images, 1).alt}
          ></div>
        </div>

        <div className="max-sm:hidden flex flex-row max-large-medium:flex-col justify-between my-6 minimal:hidden">
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
                className="w-[23rem] h-[23rem] max-large-medium:w-[26rem] max-large-medium:h-[26rem] max-xl:w-[18rem] max-xl:h-[18rem] mx-auto max-large-medium:mb-6"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default InternationalePage;

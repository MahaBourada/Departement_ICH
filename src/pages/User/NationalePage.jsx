import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const NationalePage = () => {
  const { t } = useTranslation();
  const [pageNational, setPageNational] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/collaboration-nationale?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/collaboration-nationale?lang=${lang}`
      );

      setPageNational(contentResponse.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getImageByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  const img1 = getImageByPosition(images, 1);
  const img2 = getImageByPosition(images, 2);
  const img3 = getImageByPosition(images, 3);
  const img4 = getImageByPosition(images, 4);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <nav
        aria-label={t("breadcrumb")}
        className="mb-10 my-1 p-1.5 py-1 w-full bg-bg-crumb rounded-xl flex items-center font-medium readerMode:hidden dark:bg-black leading-loose text-breadcrumb"
      >
        <Link
          to="/"
          className="px-4 py-1 rounded-xl hover:underline hover:bg-hover-crumb"
        >
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">Collaborations</span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-[#663114] dark:text-black bg-bg-transparent">
          {t("collaboration.national.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("collaboration.national.title")}
      </h1>

      <div className="my-10 mb-20 mx-16 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse my-7">
          {img1.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getImageByPosition(images, 1).path
              }`}
              alt={getImageByPosition(images, 1).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
            />
          )}
          <ReactMarkdown
            className={`my-3 ${
              img2.path ? "mx-7" : "mx-0"
            }  max-sm:mx-0 minimal:mx-0 markdown`}
            children={String(pageNational[0]?.texte)}
          />
        </div>

        <div className="flex flex-row justify-between items-center max-large-medium:flex-col">
          <div
            className={`${
              img2.path ? "w-[60%]" : "w-full"
            } minimal:w-full max-large-medium:w-full mr-10 max-lg:mr-5`}
          >
            <ReactMarkdown
              className="markdown"
              children={String(pageNational[1]?.texte)}
            />
          </div>
          {img2.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getImageByPosition(images, 2).path
              }`}
              alt={getImageByPosition(images, 2).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
            />
          )}
        </div>

        <ReactMarkdown
          className="markdown my-10"
          children={String(pageNational[2]?.texte)}
        />

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse">
          <ReactMarkdown
            className="markdown my-10 w-[80%] minimal:w-full"
            children={String(pageNational[3]?.texte)}
          />

          <div className="m-auto">
            {img3.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${
                  getImageByPosition(images, 3).path
                }`}
                alt={getImageByPosition(images, 3).alt || ""}
                width={400}
                className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
              />
            )}
            {img4.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${
                  getImageByPosition(images, 4).path
                }`}
                alt={getImageByPosition(images, 4).alt || ""}
                width={400}
                className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NationalePage;

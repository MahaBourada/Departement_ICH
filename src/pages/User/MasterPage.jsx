import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const MasterPage = () => {
  const { t } = useTranslation();
  const [pageMaster, setPageMaster] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(`/pages/master?lang=${lang}`);
      const imagesResponse = await api.get(`/pages-images/master?lang=${lang}`);

      setPageMaster(contentResponse.data);
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
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label={t("breadcrumb")}
        className="mb-10 my-1 p-1.5 py-1 w-full bg-gray-200 rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-black leading-loose text-breadcrumb"
      >
        <Link to="/" className="px-4 py-1 rounded-xl">
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-[#663114] dark:text-black bg-bg-transparent">
          {t("formation.link")}
        </span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">
          {t("formation.master.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display max-large-medium:text-dynamic-xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("formation.master.title")}
      </h1>

      <div className="my-10 mb-20 mx-16 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse my-7 readerMode:flex-col-reverse">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${
              getByPosition(images, 1).path
            }`}
            alt={getByPosition(images, 1).alt || ""}
            width={400}
            className="aspect-[1/1] object-contain minimal:hidden w-[19rem] h-[19rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] readerMode:mx-auto"
          />
          <div
            className="my-3 mx-7 max-sm:mx-0"
            dangerouslySetInnerHTML={{ __html: serializeToHtml(pageMaster, 1) }}
          ></div>
        </div>

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col readerMode:flex-col">
          <div className="w-[60%] readerMode:w-full minimal:w-full max-large-medium:w-full mr-2 max-lg:mr-5">
            <div
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageMaster, 2),
              }}
            ></div>
          </div>

          <img
            src={`${import.meta.env.VITE_BASE_URL}/${
              getByPosition(images, 2).path
            }`}
            alt={getByPosition(images, 2).alt || ""}
            width={400}
            className="minimal:hidden w-fit h-[23rem] max-sm:h-fit max-sm:rounded-2xl max-large-medium:h-[25rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] readerMode:mx-auto readerMode:my-7"
          />
        </div>

        <div
          className="my-10"
          dangerouslySetInnerHTML={{
            __html: serializeToHtml(pageMaster, 3),
          }}
        ></div>

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse readerMode:flex-col-reverse">
          <div
            className="my-10"
            dangerouslySetInnerHTML={{
              __html: serializeToHtml(pageMaster, 4),
            }}
          ></div>
          <div className="m-auto readerMode:flex">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 3).path
              }`}
              alt={getByPosition(images, 3).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
            />
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 4).path
              }`}
              alt={getByPosition(images, 4).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MasterPage;

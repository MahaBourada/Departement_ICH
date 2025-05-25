import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const LabPage = () => {
  const { t } = useTranslation();
  const [pageLab, setPageLab] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(`/pages/lab-chart?lang=${lang}`);
      const imagesResponse = await api.get(
        `/pages-images/lab-chart?lang=${lang}`
      );

      setPageLab(contentResponse.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  const img1 = getByPosition(images, 1);
  const img2 = getByPosition(images, 2);
  const img3 = getByPosition(images, 3);
  const img4 = getByPosition(images, 4);

  useEffect(() => {
    fetchData();
  }, []);

  const darkTheme = localStorage.getItem("theme");

  return (
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="max-large-medium:hidden my-1 mb-5 p-1.5 py-1 w-full bg-gray-200 rounded-xl flex items-center font-medium readerMode:hidden dark:bg-black"
      >
        <Link to="/" className="px-4 py-1 rounded-xl">
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-dark-accent dark:text-black bg-bg-transparent">
          {t("department.link")}
        </span>
        <ChevronRight
          size={33}
          color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">
          {t("department.lab-chart.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-dynamic-2xl max-large-medium:text-dynamic-xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("department.lab-chart.title")}
      </h1>

      <div className="my-10 mb-20 mx-16 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:text-2xl readerMode:w-[60ch] readerMode:mx-auto">
        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse my-7 readerMode:flex-col-reverse">
          {img1.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 1).path
              }`}
              alt={getByPosition(images, 1).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] readerMode:mx-auto"
            />
          )}
          <div
            className="my-3 mx-7 max-sm:mx-0"
            dangerouslySetInnerHTML={{ __html: serializeToHtml(pageLab, 1) }}
          ></div>
        </div>

        <div className="flex flex-row justify-between items-center max-large-medium:flex-col">
          <div
            className={`${
              img2.path ? "w-[60%]" : "w-full"
            } minimal:w-full max-large-medium:w-full mr-10 max-lg:mr-5`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageLab, 2),
              }}
            ></div>
          </div>
          {img2.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                getByPosition(images, 2).path
              }`}
              alt={getByPosition(images, 2).alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
            />
          )}
        </div>

        <div
          className="my-10"
          dangerouslySetInnerHTML={{
            __html: serializeToHtml(pageLab, 3),
          }}
        ></div>

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse">
          <div
            className="my-10"
            dangerouslySetInnerHTML={{
              __html: serializeToHtml(pageLab, 4),
            }}
          ></div>
          <div
            className={`m-auto ${
              serializeToHtml(pageLab, 4) === ""
                ? "flex flex-col"
                : "flex flex-row max-large-medium:flex-col"
            }`}
          >
            {img3.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${
                  getByPosition(images, 3).path
                }`}
                alt={getByPosition(images, 3).alt || ""}
                width={400}
                className="minimal:hidden w-[27rem] h-[27rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
              />
            )}
            {img4.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${
                  getByPosition(images, 4).path
                }`}
                alt={getByPosition(images, 4).alt || ""}
                width={400}
                className="minimal:hidden w-[27rem] h-[27rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LabPage;

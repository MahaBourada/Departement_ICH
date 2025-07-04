import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";

const LabPage = () => {
  const { t } = useTranslation();
  const [pageLab, setPageLab] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/title/lab-chart?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/title/lab-chart?lang=${lang}`
      );

      setPageLab(contentResponse.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getSectionByPosition(sections, pos) {
    return (
      sections.find((section) => section.ordre_positionnement === pos) || {}
    );
  }

  const section1 = getSectionByPosition(pageLab, 1);
  const section2 = getSectionByPosition(pageLab, 2);
  const section3 = getSectionByPosition(pageLab, 3);
  const section4 = getSectionByPosition(pageLab, 4);

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
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: t("research.link"),
          },
          {
            label: t("research.lab-chart.title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-large-medium:text-dynamic-xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("research.lab-chart.title")}
      </h1>

      <div className="my-10 mb-20 mx-16 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse my-7 readerMode:flex-col-reverse">
          {img1.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
              alt={img1.alt || ""}
              width={400}
              className="minimal:hidden w-[19rem] h-[19rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] readerMode:mx-auto"
            />
          )}

          {section1.texte && (
            <ReactMarkdown
              className="my-3 mx-7 max-sm:mx-0 markdown"
              children={String(section1.texte)}
            />
          )}
        </div>

        <div className="flex flex-row justify-between items-center max-large-medium:flex-col">
          <div
            className={`${
              img2.path ? "w-[60%]" : "w-full"
            } minimal:w-full max-large-medium:w-full mr-10 max-lg:mr-5`}
          >
            {section2.texte && (
              <ReactMarkdown
                className="markdown"
                children={String(section2.texte)}
              />
            )}
          </div>
          {img2.path && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${img2.path}`}
              alt={img2.alt || ""}
              width={400}
              className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
            />
          )}
        </div>

        {section3.texte && (
          <ReactMarkdown
            className="markdown my-10"
            children={String(section3.texte)}
          />
        )}

        <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse">
          {section4.texte && (
            <ReactMarkdown
              className="markdown my-10"
              children={String(section4.texte)}
            />
          )}

          <div
            className={`m-auto ${
              pageLab[3]?.texte === ""
                ? "flex flex-col"
                : "flex flex-row max-large-medium:flex-col"
            }`}
          >
            {img3.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${img3.path}`}
                alt={img3.alt || ""}
                width={400}
                className="minimal:hidden w-[27rem] h-[27rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px] my-5"
              />
            )}

            {img4.path && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${img4.path}`}
                alt={img4.alt || ""}
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

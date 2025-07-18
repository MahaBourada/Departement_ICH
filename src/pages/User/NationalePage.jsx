import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import HorizontalCarousel from "../../components/HorizontalCarousel";

const NationalePage = () => {
  const { t } = useTranslation();
  const [pageNational, setPageNational] = useState([]);
  const [images, setImages] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(
        `/pages/title/collaboration-nationale?lang=${lang}`
      );
      const imagesResponse = await api.get(
        `/pages-images/title/collaboration-nationale?lang=${lang}`
      );
      const collabsResponse = await api.get(
        `/collaborations/content?type=nationale&lang=${lang}`
      );

      setPageNational(contentResponse.data);
      setImages(imagesResponse.data);
      setCollabs(collabsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getImageByPosition(images, pos) {
    return images.find((img) => img.ordre_positionnement === pos) || {};
  }

  const img1 = getImageByPosition(images, 1);
  const img2 = getImageByPosition(images, 2);

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
            label: "Collaborations",
          },
          {
            label: t("collaboration.national.title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("collaboration.national.title")}
      </h1>

      <div className="my-5 mb-20 mx-5 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        {pageNational[0]?.texte && (
          <ReactMarkdown
            className={`my-3 minimal:mx-0 markdown`}
            children={String(pageNational[0]?.texte)}
          />
        )}

        {img1.path && (
          <div className="flex flex-col items-center justify-start mt-10 my-auto">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
              alt={img1.alt || ""}
              width={400}
              className="minimal:hidden w-3/4 max-large:w-fit m-auto my-5 max-large-medium:mx-auto max-large-medium:mb-6"
            />

            {img1?.source && (
              <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit mx-auto max-w-full break-words whitespace-normal">
                <span className="font-semibold">Source :</span> {img1.source}
              </p>
            )}
          </div>
        )}

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/collaborations/collaborations-nationales/collabs-conventions"
          className="mx-auto my-10 flex justify-center items-center w-fit cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white text-nav max-sm:text-[1.125rem] leading-normal"
        >
          {t("collaboration.national.more")}
        </Link>

        {pageNational[1]?.texte && (
          <ReactMarkdown
            className="markdown"
            children={String(pageNational[1]?.texte)}
          />
        )}

        <HorizontalCarousel collabs={collabs} />
      </div>
    </main>
  );
};

export default NationalePage;

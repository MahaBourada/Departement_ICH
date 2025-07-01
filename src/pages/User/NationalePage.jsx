import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { SmallFilledButton } from "../../components/Buttons";
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
    <main className="flex-grow my-10 mb-20 mx-16">
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

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
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
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
            alt={img1.alt || ""}
            width={400}
            className="minimal:hidden w-3/4 m-auto my-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
          />
        )}

        <Link
          onClick={() => window.scrollTo({ top: 0 })}
          to="/collaborations/collaborations-nationales/collabs-conventions"
          className="mx-auto my-10 flex justify-center items-center w-fit cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          Plus de collaborations
        </Link>

        {pageNational[1]?.texte && (
          <ReactMarkdown
            className="markdown"
            children={String(pageNational[1]?.texte)}
          />
        )}

        {img2.path && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${img2.path}`}
            alt={img2.alt || ""}
            width={400}
            className="minimal:hidden w-[23rem] h-[23rem] max-sm:w-[16rem] max-sm:h-[16rem] max-large-medium:w-[25rem] max-large-medium:h-[25rem] max-xl:w-[20rem] max-xl:h-[20rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-[50px]"
          />
        )}

        {/* <div className="flex flex-row items-center overflow-x-auto space-x-10 my-16">
          {collabs
            .filter(
              (collab) =>
                collab.type === "Nationale" &&
                collab.categorie === "Partenaire socio-économique"
            )
            .map((collab, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${collab.logo}`}
                  alt={`Logo de l'entreprise ${collab.nom}`}
                  className="w-60 my-auto"
                />
              </div>
            ))}
        </div> */}
        <HorizontalCarousel collabs={collabs} />

        <Link
          onClick={() => window.scrollTo({ top: 0 })}
          to="/collaborations/collaborez-avec-nous"
          className="mx-auto my-10 flex justify-center items-center w-fit cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal"
        >
          Collaborez avec nous
        </Link>
      </div>
    </main>
  );
};

export default NationalePage;

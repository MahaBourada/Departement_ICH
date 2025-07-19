import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { House } from "lucide-react";

const AlumniPage = () => {
  const { t } = useTranslation();
  const [pageAlumni, setPageAlumni] = useState([]);
  const [images, setImages] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const contentResponse = await api.get(`/pages/title/alumni?lang=${lang}`);
      const imagesResponse = await api.get(
        `/pages-images/title/alumni?lang=${lang}`
      );

      setPageAlumni(contentResponse.data);
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

  const section1 = getSectionByPosition(pageAlumni, 1);
  const section2 = getSectionByPosition(pageAlumni, 2);
  const section3 = getSectionByPosition(pageAlumni, 3);
  const section4 = getSectionByPosition(pageAlumni, 4);

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
            label: (
              <span className="flex flex-row items-center gap-x-2">
                <House size={26} strokeWidth={2.2} />
                {t("home.link")}
              </span>
            ),
          },
          {
            label: t("formation.link"),
          },
          {
            label: "Alumni",
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-large-medium:text-4xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        Alumni
      </h1>

      <div className="my-10 max-sm:mt-0 mb-20 mx-16 font-body max-large-medium:mx-0 max-xl:mx-5 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="flex flex-row justify-between items-start max-large:flex-col-reverse my-7 max-sm:mt-0 readerMode:flex-col-reverse">
          {img1.path && (
            <div className="w-full flex flex-col items-center my-auto">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${img1.path}`}
                alt={img1.alt || ""}
                width={400}
                className="minimal:hidden w-fit h-[16rem] max-sm:w-fit max-sm:h-[16rem] max-large:w-fit max-large:h-[27rem] m-auto mx-5 max-large-medium:mx-auto max-large-medium:mb-6 rounded-3xl readerMode:mx-auto"
              />

              {img1?.source && (
                <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto max-w-full break-words whitespace-normal">
                  <span className="font-semibold">Source :</span> {img1.source}
                </p>
              )}
            </div>
          )}

          {section1.texte && (
            <ReactMarkdown
              className="my-3 mx-7 max-sm:mx-0 markdown"
              children={String(section1.texte)}
            />
          )}
        </div>

        <div className="flex flex-row justify-between items-center max-large:flex-col">
          <div
            className={`${
              img2.path ? "w-[60%]" : "w-full"
            } minimal:w-full max-large:w-full max-large:my-5 mr-10 max-lg:mr-0`}
          >
            {section2.texte && (
              <ReactMarkdown
                className="markdown"
                children={String(section2.texte)}
              />
            )}
          </div>

          {img2.path && (
            <div className="flex flex-col items-center my-auto max-large:w-full">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${img2.path}`}
                alt={img2.alt || ""}
                width={400}
                className="minimal:hidden w-fit h-[16rem] max-sm:w-fit max-sm:h-[16rem] max-sm:mt-5 m-auto mx-5 max-large:w-fit max-large:h-1/2 max-large-medium:mx-auto max-large-medium:mb-6 rounded-3xl"
              />

              {img2?.source && (
                <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto max-w-full break-words whitespace-normal">
                  <span className="font-semibold">Source :</span> {img2.source}
                </p>
              )}
            </div>
          )}
        </div>

        {section3.texte && (
          <ReactMarkdown
            className="markdown my-10 max-sm:mt-1"
            children={String(section3.texte)}
          />
        )}

        <div className="flex flex-row justify-between items-start max-large:flex-col-reverse">
          {section4.texte && (
            <ReactMarkdown
              className={`markdown my-10 ${
                img3.path || img4.path ? "w-[60%] max-large:w-full" : "w-full"
              }`}
              children={String(section4.texte)}
            />
          )}

          <div
            className={`m-auto ${
              section3?.texte !== ""
                ? "flex flex-col"
                : "flex flex-row max-large-medium:flex-col"
            }`}
          >
            {img3.path && (
              <div className="flex flex-col items-center justify-start my-auto">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${img3.path}`}
                  alt={img3.alt || ""}
                  width={400}
                  className="minimal:hidden w-fit h-[25rem] max-large:w-full max-large:h-1/2 m-auto max-large-medium:mx-auto max-large-medium:mb-6 rounded-3xl"
                />

                {img3?.source && (
                  <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto max-w-full break-words whitespace-normal">
                    <span className="font-semibold">Source :</span>{" "}
                    {img3.source}
                  </p>
                )}
              </div>
            )}

            {img4.path && (
              <div className="flex flex-col items-center justify-start mt-10 my-auto">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${img4.path}`}
                  alt={img4.alt || ""}
                  width={400}
                  className="minimal:hidden w-fit h-[25rem] max-large:w-full max-large:h-1/2 m-auto max-large-medium:mx-auto max-large-medium:mb-6 rounded-3xl"
                />

                {img4?.source && (
                  <p className="text-neutral-700 dark:text-neutral-300 text-dynamic-xsm w-fit ml-auto max-w-full break-words whitespace-normal">
                    <span className="font-semibold">Source :</span>{" "}
                    {img4.source}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlumniPage;

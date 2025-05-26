import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ConferencesPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="mb-10 my-1 p-1.5 py-1 w-full bg-gray-200 rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-black"
      >
        <Link to="/" className="px-4 py-1 rounded-xl">
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-dark-accent dark:text-black bg-bg-transparent translate-[1px]">
          {t("news.link")}
        </span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">
          {t("news.conferences.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 readerMode:w-fit readerMode:mx-auto">
        {t("news.conferences.title")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] max-large-medium:readerMode:w-full readerMode:mx-auto">
        <h2 className="font-main font-medium text-dynamic-xl mt-6 mb-2">
          Prochaine conférence
        </h2>

        <div className="flex">
          <div className="w-[62%] readerMode:w-full max-large-large:w-full minimal:w-full mr-12 minimal:mr-4 ml-6 max-md:mx-2">
            <div className="h-[0.5px] bg-black dark:bg-gray-300 my-5 w-full"></div>

            <div>
              <div className="flex items-start justify-between">
                <div className="w-[70%]">
                  <h3 className="font-semibold my-2">
                    Yousra Ben Jmaa (Laboratoire Signaux et Smart Systèmes,
                    Enis, Tunis)
                  </h3>

                  <p className="my-2">
                    Vision par ordinateur au service des personnes handicapées
                  </p>
                  <p className="font-semibold my-2">17h-19h30</p>
                </div>

                <div>
                  <p className="font-semibold text-end my-2">
                    13 février 2025
                    <br />
                    20 février 2025
                  </p>

                  <ul className="text-end my-2">
                    <li>Université Paris 8</li>
                    <li>Bâtiment C</li>
                    <li>Salle C223</li>
                  </ul>
                </div>
              </div>

              <p className="my-2">
                Dans un premier lieu je présenterai des généralités sur la
                vision par ordinateurs (principes, modèles, étapes et
                applications). Dans un deuxième temps je présenterai les
                techniques de détection et reconnaissance d'objets et je
                terminerai par le suivi dans les séquences vidéos. Je donnerai à
                chaque fois des exemples liés au handicap.
              </p>
            </div>
            <div className="h-[0.5px] bg-black dark:bg-gray-300 my-5 w-full"></div>
          </div>

          <img
            src="assets/vectors/Conferences.svg"
            alt=""
            role="presentation"
            className="readerMode:hidden max-large-large:hidden m-auto"
            width={350}
          />
        </div>
      </div>

      <div className="mr-10 mx-4 max-md:mr-0 max-md:mx-2  readerMode:leading-loose readerMode:w-[60ch] max-large-medium:readerMode:w-full readerMode:mx-auto">
        <h2 className="font-main font-medium text-dynamic-xl my-6">
          Conférences passées
        </h2>

        <div className="mx-6 max-md:mx-2">
          <div className="h-[0.5px] bg-black dark:bg-gray-300 my-5 w-full"></div>

          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold my-2">
                  Yousra Ben Jmaa (Laboratoire Signaux et Smart Systèmes, Enis,
                  Tunis)
                </h3>

                <p className="my-2">
                  Vision par ordinateur au service des personnes handicapées
                </p>
                <p className="font-semibold my-2">17h-19h30</p>
              </div>

              <div>
                <p className="font-semibold text-end my-2">
                  13 février 2025
                  <br />
                  20 février 2025
                </p>

                <ul className="text-end my-2">
                  <li>Université Paris 8</li>
                  <li>Bâtiment C</li>
                  <li>Salle C223</li>
                </ul>
              </div>
            </div>

            <p className="my-2">
              Dans un premier lieu je présenterai des généralités sur la vision
              par ordinateurs (principes, modèles, étapes et applications). Dans
              un deuxième temps je présenterai les techniques de détection et
              reconnaissance d'objets et je terminerai par le suivi dans les
              séquences vidéos. Je donnerai à chaque fois des exemples liés au
              handicap.
            </p>
          </div>

          <div className="h-[0.5px] bg-black dark:bg-gray-300 my-5 w-full"></div>

          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold my-2">
                  Yousra Ben Jmaa (Laboratoire Signaux et Smart Systèmes, Enis,
                  Tunis)
                </h3>

                <p className="my-2">
                  Vision par ordinateur au service des personnes handicapées
                </p>
                <p className="font-semibold my-2">17h-19h30</p>
              </div>

              <div>
                <p className="font-semibold text-end my-2">
                  13 février 2025
                  <br />
                  20 février 2025
                </p>

                <ul className="text-end my-2">
                  <li>Université Paris 8</li>
                  <li>Bâtiment C</li>
                  <li>Salle C223</li>
                </ul>
              </div>
            </div>

            <p className="my-2">
              Dans un premier lieu je présenterai des généralités sur la vision
              par ordinateurs (principes, modèles, étapes et applications). Dans
              un deuxième temps je présenterai les techniques de détection et
              reconnaissance d'objets et je terminerai par le suivi dans les
              séquences vidéos. Je donnerai à chaque fois des exemples liés au
              handicap.
            </p>
          </div>
          <div className="h-[0.5px] bg-black dark:bg-gray-300 my-5 w-full"></div>
        </div>
      </div>
    </main>
  );
};

export default ConferencesPage;

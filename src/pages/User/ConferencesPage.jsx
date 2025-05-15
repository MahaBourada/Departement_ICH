import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ConferencesPage = () => {
  const { t } = useTranslation();

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
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline translate-[1px]">
          {t("news.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("news.conferences.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2">
        {t("news.conferences.title")}
      </h1>

      <div>
        <h2 className="font-main font-medium text-header mx-4">
          Prochaine conférence
        </h2>

        <div className="flex">
          <div className="w-[55%] minimal:w-full mr-12 minimal:mr-4 ml-6">
            <div className="h-[0.5px] bg-black my-5 w-full"></div>

            <div className="text-body">
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
            <div className="h-[0.5px] bg-black my-5 w-full"></div>
          </div>

          <img
            src="assets/vectors/Conferences.svg"
            alt=""
            role="presentation"
            className="minimal:hidden"
            width={500}
          />
        </div>
      </div>

      <div className="mr-10">
        <h2 className="font-main font-medium text-header mx-4">
          Conférences passées
        </h2>

        <div className="h-[0.5px] bg-black my-5 w-full mx-6"></div>

        <div className="text-body w-full mx-6">
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

        <div className="h-[0.5px] bg-black my-5 w-full mx-6"></div>

        <div className="text-body w-full mx-6">
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

        <div className="h-[0.5px] bg-black my-5 w-full mx-6"></div>
      </div>
    </main>
  );
};

export default ConferencesPage;

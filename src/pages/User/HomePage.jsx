import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const [pageAccueil, setPageAccueil] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/pages/accueil?lang=${lang}`);

      setPageAccueil(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow leading-9">
      <div className="h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[url('/assets/images/HomeImage.png')]">
        <h1
          className="text-white bg-bg-transparent py-6 px-7 rounded-4xl font-main font-semibold text-display text-center"
          style={{ textShadow: "2px 2px 5px #333" }}
        >
          {t("home.title.1")}
          <br /> <br />
          {t("home.title.2")}
        </h1>
      </div>

      <div className="my-10 mb-20 mx-16 font-body">
        {/* <p className="my-7 mt-10">
          <span className="font-semibold">
            Le département ICH (Ingénierie Cognition Handicap)
          </span>
          de l'Université Paris 8 est spécialisé dans la recherche et le
          développement de{" "}
          <span className="font-semibold">technologies d'assistance</span>{" "}
          destinées aux{" "}
          <span className="font-semibold">
            personnes en situation de handicap
          </span>
          . Il conçoit des outils techniques visant à améliorer la
          communication, la perception, l'apprentissage et l'interaction
          sociale, en s'appuyant sur des approches issues de{" "}
          <span className="font-semibold">
            l'intelligence artificielle, de l'apprentissage automatique et des
            interfaces homme-machine.
          </span>
        </p> */}
        <div
          className="my-7 mt-10"
          dangerouslySetInnerHTML={{ __html: serializeToHtml(pageAccueil, 1) }}
        ></div>

        <div className="flex justify-between items-start">
          <div className="w-[60%] mr-10">
            {/* <p className="font-semibold">
              Les travaux du département s'articulent autour de plusieurs axes :
            </p>
            <ul className="list-disc ml-7">
              <li>
                La conception, la mise en œuvre et l'évaluation d'outils
                technologiques adaptés aux besoins des personnes handicapées.
              </li>
              <li>
                L'analyse des expériences et des besoins des usagers afin
                d'optimiser les solutions proposées.
              </li>
              <li>
                Le développement de modèles et d'interfaces basés sur
                l'intelligence artificielle et l'apprentissage automatique.
              </li>
            </ul> */}
            <div
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 2),
              }}
            ></div>

            {/* <p className="my-10">
              Le département ICH est également impliqué dans la formation à
              travers le{" "}
              <span className="font-semibold">
                Master MIASHS, spécialité Technologie et Handicap
              </span>
              . Ce programme vise à former des étudiants à{" "}
              <span className="font-semibold">
                la conception et au développement de technologies d'assistance
              </span>
              , en alliant enseignements théoriques, travaux pratiques et
              expériences en milieu professionnel.
            </p> */}
            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 3),
              }}
            ></div>

            {/* <p className="my-10">
              Par ses activités de recherche et d'enseignement, le département
              contribue à{" "}
              <span className="font-semibold">
                l'amélioration des conditions de vie des personnes handicapées
              </span>{" "}
              en développant des solutions adaptées à leurs besoins spécifiques.
            </p> */}
            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 4),
              }}
            ></div>
          </div>

          <div className="w-[33rem] h-[33rem] bg-cover bg-center bg-no-repeat bg-[url('/assets/images/unicorn.jpeg')] rounded-[50px]"></div>
        </div>

        <div className="flex justify-between my-6">
          <img src="assets/images/img2.png" alt="" width={400} />
          <img src="assets/images/img3.png" alt="" width={400} />
          <img src="assets/images/Nao.png" alt="" width={400} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

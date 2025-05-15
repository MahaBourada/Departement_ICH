import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 ">
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
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.projects_title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2">
        {t("department.projects_title")}
      </h1>

      <div className="border-black border-[1px] my-5 w-full mx-6"></div>

      <div className="text-body w-full mx-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold font-main text-header my-2">Wheely</h3>

            <div className="minimal:hidden block">
              <h4 className="font-semibold text-2xl my-2">Membres</h4>
              <ul className="list-disc mx-7">
                <li>Alaé Zerdam</li>
                <li>Amane Senhaji</li>
                <li>Mohamed Ait Ahcene</li>
                <li>Rayane Mokhtari</li>
              </ul>
            </div>

            <div className="minimal:block hidden">
              <span className="font-semibold">Membres : </span> Alaé Zerdam,
              Amane Senhaji, Mohamed Ait Ahcene, Rayane Mokhtari
            </div>

            <p className="my-2">
              <span className="font-semibold">Année : </span>2024/2025
            </p>
          </div>

          <div className="flex justify-between items-center">
            <img
              src="src/assets/images/wheely1.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/wheely2.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/wheely3.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
          </div>
        </div>

        <h4 className="font-semibold text-2xl my-2">Objectif</h4>
        <p className="m-2">
          Wheely est un assistant intelligent qui permet d'améliorer le niveau
          de sécurité des utilisateurs conduisant un fauteuil roulant électrique
          en détectant la fatigue faciale et lancer des appels d'aide d'une
          façon automatique. La détection de fatigue se base sur les données
          collectées par la caméra ce qui permettra de lancer des alertes
          sonores et visuelles afin de solliciter l'aide nécessaire.
        </p>
      </div>

      <div className="border-black border-[1px] my-5 w-full mx-6"></div>

      <div className="text-body w-full mx-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold font-main text-header my-2">
              NaoBody
            </h3>

            <h4 className="font-semibold text-2xl my-2">Membres</h4>
            <ul className="list-disc mx-7">
              <li>Fanta Kamissokho</li>
              <li>Mouna Benboudjema</li>
              <li>Nouna Hamam</li>
              <li>Sonia Ayouni</li>
            </ul>

            <p className="my-2">
              <span className="font-semibold">Année : </span>2024/2025
            </p>
          </div>

          <div className="flex justify-between items-center">
            <img
              src="src/assets/images/nao1.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/nao2.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/nao3.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
          </div>
        </div>

        <h4 className="font-semibold text-2xl my-2">Objectif</h4>
        <p className="m-2">
          A travers le projet NaoBody, Nao va aider les enfants atteints de TSA
          à reconnaître les parties du corps. En utilisant la désignation de ces
          parties, l'imitation des mouvements, les enfants vont développer une
          meilleure prise de conscience corporelle, ce qui renforce leur
          coordination motrice globale.
        </p>
      </div>

      <div className="border-black border-[1px] my-5 w-full mx-6"></div>

      <div className="text-body w-full mx-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold font-main text-header my-2">
              Detect'chute
            </h3>

            <h4 className="font-semibold text-2xl my-2">Membres</h4>
            <ul className="list-disc mx-7">
              <li>Anna Dong</li>
              <li>Arthur Le Breton</li>
              <li>Florian Lefebvre</li>
              <li>Sofiane Lhiyat</li>
            </ul>

            <p className="my-2">
              <span className="font-semibold">Année : </span>2024/2025
            </p>
          </div>

          <div className="flex justify-between items-center">
            <img
              src="src/assets/images/detect1.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/detect2.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/detect3.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
          </div>
        </div>

        <h4 className="font-semibold text-2xl my-2">Objectif</h4>
        <p className="m-2">
          L'objectif de ce projet est de détecter la chute d'une personne dans
          le cadre du domicile. On va relever des informations sur la personne à
          l'aide de caméras (technologie pas encore choisie) et des capteurs
          (capteurs de pression, capteurs portés type accéléromètres, détecteurs
          IR). Nous allons croiser ces données afin de détecter la chute avec
          fiabilité. Si un comportement anormal ou une suspicion de chute est
          détectée, la personne va valider ou non la chute avec une synthèse
          vocale pour écarter les cas de faux-positifs, puis se faire contacter
          par une hotline à l'aide d'une application téléphone ou d'une montre.
        </p>
      </div>

      <div className="border-black border-[1px] my-5 w-full mx-6"></div>

      <div className="text-body w-full mx-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold font-main text-header my-2">
              EyeRobot
            </h3>

            <h4 className="font-semibold text-2xl my-2">Membres</h4>
            <ul className="list-disc mx-7">
              <li>Emma Daoust</li>
              <li>Jeanne Ferron</li>
              <li>Marie Fernandez</li>
              <li>Tiffany Voguin</li>
            </ul>

            <p className="my-2">
              <span className="font-semibold">Année : </span>2024/2025
            </p>
          </div>

          <div className="flex justify-between items-center">
            <img
              src="src/assets/images/eye1.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/eye2.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
            <img
              src="src/assets/images/eye3.png"
              alt=""
              width={275}
              className="mx-4 minimal:hidden"
            />
          </div>
        </div>

        <h4 className="font-semibold text-2xl my-2">Objectif</h4>
        <p className="m-2">
          Nous avons décidé d'axer notre projet sur la thématique des jouets
          adaptés pour des enfants ayant des déficiences
          motrices/sensitivo-motrices n'ayant pas les capacités de manipuler des
          objets/jouets avec leurs membres supérieurs. En effet, certains
          enfants ont, en raison de pathologies congénitales ou acquises, des
          incapacités motrices ne leur permettant pas de jouer avec des jouets
          "classiques". Ainsi, nous avons fait le choix d'affiner notre idée en
          nous orientant sur la conception d'un jouet adapté. Nous envisageons
          donc la conception d'une voiture motorisée qui sera contrôlée grâce
          aux mouvements oculaires (eye-tracker) ou à un outil de contrôle par
          mouvements de tête. Un choix sera fait après une étude plus poussée
          des besoins. La voiture sera connectée à une application sur tablette.
          Cette application contiendra une "manette" virtuelle et la
          retranscription vidéo des images capturées par une caméra fixée sur la
          voiture. De plus, des capteurs (d'obstacles par exemple) permettront
          une assistance dans la conduite de la voiture. Nous envisageons
          également la création d'un jeu vidéo en réalité augmentée (ex : la
          voiture devra parcourir la salle dans laquelle elle se trouve afin de
          récolter des pièces de monnaie virtuelles).
        </p>
      </div>

      <div className="border-black border-[1px] my-5 w-full mx-6"></div>
    </main>
  );
};

export default ProjectsPage;

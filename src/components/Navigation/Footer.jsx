import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccessibilityMenu from "../AccessibilityMenu";

const Footer = ({ switchLang }) => {
  const { t } = useTranslation();
  const [showLang, setShowLang] = useState(false);

  const langMenuRef = useRef(null);

  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showLang) {
        handleClickOutside(event, setShowLang, langMenuRef);
      }
    };

    if (showLang) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showLang]);

  return (
    <footer className="max-large:hidden flex flex-col items-center py-4 px-10 bg-main dark:bg-dark-main dark:text-gray-300 large-medium:text-nav leading-normal">
      {/* <div className="flex justify-between items-end w-full">
        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          aria-hidden={localStorage.getItem("theme") === "dark" ? false : true}
          width={130}
          className="m-1 hidden dark:block"
        />
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          aria-hidden={localStorage.getItem("theme") === "dark" ? false : true}
          width={130}
          className="m-1 block dark:hidden"
        />
        <div>
          <p className="font-medium text-xl">{t("accessibility_confirmed")}</p>
          <div className="flex flex-row items-center justify-end">
            <img
              src="/ich/assets/vectors/wave.svg"
              alt="Logo de wave"
              width={30}
              className="m-2 block"
            />
            <img
              src="/ich/assets/vectors/W3C.svg"
              alt="Logo de W3C"
              width={60}
              className="m-2 block"
            />
          </div>
        </div>
      </div>

      <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div> */}

      <div className="flex justify-between items-start w-full">
        <div className="flex items-center">
          {localStorage.getItem("lang") === "en" ? (
            <button
              type="button"
              className="cursor-pointer w-fit flex justify-end items-center mx-1 transition-colors duration-300 hover:underline p-2 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              onClick={() => switchLang("fr")}
            >
              <img
                src="/ich/assets/images/french.png"
                alt="Version française"
                width={38}
              />
            </button>
          ) : (
            <button
              type="button"
              className="cursor-pointer w-fit flex justify-end items-center mx-1 transition-colors duration-300 hover:underline p-2 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              onClick={() => switchLang("en")}
            >
              <img
                src="/ich/assets/images/english.png"
                alt="English version"
                width={38}
              />
            </button>
          )}

          <div className="h-7 bg-black dark:bg-gray-300 w-[1px] rounded-full mx-1"></div>

          <AccessibilityMenu position="bottom-[3.2rem] left-1" />
        </div>

        <nav className="flex justify-between font-main dyslexiaTheme:font-dyslexia text-nav">
          <div className="flex flex-col px-2">
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/"
            >
              {t("home.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="mx-1 p-2 font-medium">{t("department.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/departement/actualites"
            >
              {t("department.news.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/departement/equipe"
            >
              {t("department.team.link")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">{t("formation.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/formation/master"
            >
              {t("formation.master.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/formation/projets-etudiants"
            >
              {t("formation.projects.title")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/formation/prix-concours"
            >
              {t("formation.awards_title.title")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">{t("research.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/recherche/lab-chart"
            >
              {t("research.lab-chart.link")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">Collaborations</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/collaborations/collaborations-nationales"
            >
              {t("collaboration.national.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg"
              }
              to="/collaborations/collaborations-internationales"
            >
              {t("collaboration.international.link")}
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="flex justify-between items-center mt-10">
        <Link
          to="/accessibilite"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="mx-1 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg hover:underline px-1.5"
        >
          {t("footer.accessibility")}
        </Link>
        <p className="mx-1">|</p>
        <Link
          to="/credits"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="mx-1 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg hover:underline px-1.5"
        >
          {t("footer.credits")}
        </Link>
        <p className="mx-1">|</p>
        <Link
          to="/mentions-legales"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="mx-1 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg hover:underline px-1.5"
        >
          {t("footer.mentions")}
        </Link>
        <p className="mx-1">|</p>
        <Link
          to="/politique-confidentialite"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="mx-1 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg hover:underline px-1.5"
        >
          {t("footer.policy")}
        </Link>
        <p className="mx-1">|</p>
        <p
          /* to="/droits-auteurs" */
          /* onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} */
          className="mx-1 transition-colors duration-300 rounded-lg px-1.5"
        >
          @2025 {t("footer.copyright.2")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

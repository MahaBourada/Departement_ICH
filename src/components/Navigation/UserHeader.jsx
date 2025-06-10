import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccessibilityMenu from "../AccessibilityMenu";

const Header = ({ switchLang }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const [showFormation, setShowFormation] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const [showRecherche, setShowRecherche] = useState(false);
  const [showColl, setShowColl] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const formationMenuRef = useRef(null);
  const deptMenuRef = useRef(null);
  const rechercheMenuRef = useRef(null);
  const collMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showFormation) {
        handleClickOutside(event, setShowFormation, formationMenuRef);
      }
      if (showDept) {
        handleClickOutside(event, setShowDept, deptMenuRef);
      }
      if (showRecherche) {
        handleClickOutside(event, setShowRecherche, rechercheMenuRef);
      }
      if (showColl) {
        handleClickOutside(event, setShowColl, collMenuRef);
      }
      if (showLang) {
        handleClickOutside(event, setShowLang, langMenuRef);
      }
    };

    if (showFormation || showDept || showRecherche || showColl || showLang) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showFormation, showDept, showRecherche, showColl, showLang]);

  const handleLinkClick = () => {
    setShowFormation(false);
    setShowDept(false);
    setShowRecherche(false);
    setShowColl(false);
    setShowLang(false);

    window.scrollTo({ top: 0 });
  };

  return (
    <header className="max-large-medium:hidden flex justify-between items-center font-main large-medium:text-nav font-medium py-2 px-10 max-lg:px-8 bg-main dark:bg-dark-main dark:text-gray-300 leading-normal">
      <img
        src="/ich/assets/vectors/Logo.svg"
        alt="Logo de l'université Paris 8"
        width={160}
        className="m-5 block dark:hidden"
      />
      <img
        src="/ich/assets/vectors/LogoDark.svg"
        alt="Logo de l'université Paris 8"
        width={160}
        className="m-5 hidden dark:block"
      />

      <div className="flex flex-col items-end">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {localStorage.getItem("lang") === "en" ? (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 mx-1 hover:underline hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                onClick={() => switchLang("fr")}
              >
                <img
                  src="/ich/assets/images/french.png"
                  alt="Version française"
                  width={33}
                  className="py-2"
                />
              </button>
            ) : (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 mx-1 hover:underline hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                onClick={() => switchLang("en")}
              >
                <img
                  src="/ich/assets/images/english.png"
                  alt="English version"
                  width={33}
                  className="py-2"
                />
              </button>
            )}

            <AccessibilityMenu />
          </div>

          <div className="h-7 bg-black dark:bg-gray-300 w-[1px] rounded-full mx-2"></div>

          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/admin"
            className="text-nav px-2.5 py-1.5 mx-1 cursor-pointer hover:underline p-2 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
          >
            Mon espace
          </Link>
        </div>

        <nav className="flex justify-between items-center">
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/"
            className={`mx-1 px-2.5 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
              location.pathname === "/" ? "underline" : ""
            }`}
          >
            {t("home.link")}
          </Link>

          <div className="relative" ref={deptMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
                ["/departement/actualites", "/departement/equipe"].includes(
                  location.pathname
                )
                  ? "underline"
                  : ""
              }`}
              onClick={() => setShowDept(!showDept)}
            >
              <p className="mx-1">{t("department.link")}</p>
              <ChevronDown
                size={26}
                className="text-[#232323] dark:text-gray-300"
                strokeWidth={2.5}
              />
            </button>
            {showDept && (
              <div className="absolute w-[95%] flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/departement/actualites"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.news.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/departement/equipe"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.team.link")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={formationMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
                [
                  "/formation/master",
                  "/formation/projets-etudiants",
                  "/formation/prix-concours",
                ].includes(location.pathname)
                  ? "underline"
                  : ""
              }`}
              onClick={() => setShowFormation(!showFormation)}
            >
              <p className="mx-1">{t("formation.link")}</p>
              <ChevronDown
                size={26}
                className="text-[#232323] dark:text-gray-300"
                strokeWidth={2.5}
              />
            </button>

            {showFormation && (
              <div className="absolute min-w-max flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/formation/master"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("formation.master.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/formation/projets-etudiants"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("formation.projects.title")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/formation/prix-concours"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("formation.awards_title")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={rechercheMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
                ["/recherche/lab-chart"].includes(location.pathname)
                  ? "underline"
                  : ""
              }`}
              onClick={() => setShowRecherche(!showRecherche)}
            >
              <p className="mx-1">{t("research.link")}</p>
              <ChevronDown
                size={26}
                className="text-[#232323] dark:text-gray-300"
                strokeWidth={2.5}
              />
            </button>

            {showRecherche && (
              <div className="absolute w-[95%] flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/recherche/lab-chart"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("research.lab-chart.link")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={collMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
                [
                  "/collaboration-nationale",
                  "/collaboration-internationale",
                ].includes(location.pathname)
                  ? "underline"
                  : ""
              }`}
              onClick={() => setShowColl(!showColl)}
            >
              <p className="mx-1">Collaboration</p>
              <ChevronDown
                size={26}
                className="text-[#232323] dark:text-gray-300"
                strokeWidth={2.5}
              />
            </button>

            {showColl && (
              <div className="absolute w-[95%] flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/collaboration-nationale"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("collaboration.national.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/collaboration-internationale"
                  className="block w-full hover:bg-bg-crumb focus:bg-bg-crumb dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("collaboration.international.link")}
                </Link>
              </div>
            )}
          </div>
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/contact"
            className={`px-2.5 py-1.5 mx-1 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline ${
              location.pathname === "/contact" ? "underline" : ""
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

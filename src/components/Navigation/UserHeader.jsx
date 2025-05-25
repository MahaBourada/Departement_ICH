import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccessibilityMenu from "../AccessibilityMenu";

const Header = ({ switchLang }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const [showAct, setShowAct] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const [showColl, setShowColl] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const actMenuRef = useRef(null);
  const deptMenuRef = useRef(null);
  const collMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showAct) {
        handleClickOutside(event, setShowAct, actMenuRef);
      }
      if (showDept) {
        handleClickOutside(event, setShowDept, deptMenuRef);
      }
      if (showColl) {
        handleClickOutside(event, setShowColl, collMenuRef);
      }
      if (showLang) {
        handleClickOutside(event, setShowLang, langMenuRef);
      }
    };

    if (showAct || showDept || showColl || showLang) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showAct, showDept, showColl, showLang]);

  const handleLinkClick = () => {
    setShowAct(false);
    setShowDept(false);
    setShowColl(false);
    setShowLang(false);

    window.scrollTo({ top: 0 });
  };

  const darkTheme = localStorage.getItem("theme");

  return (
    <header className="max-large-medium:hidden flex justify-between items-center font-main large-medium:text-dynamic-xl lg:text-dynamic-xl font-medium py-2 px-10 max-lg:px-8 bg-main dark:bg-dark-main dark:text-gray-300">
      {darkTheme === "dark" ? (
        <>
          <img
            src="/ich/assets/vectors/LogoDark.svg"
            alt="Logo de l'université Paris 8"
            width={140}
          />
        </>
      ) : (
        <>
          <img
            src="/ich/assets/vectors/Logo.svg"
            alt="Logo de l'université Paris 8"
            width={140}
          />
        </>
      )}

      <div className="flex flex-col items-end">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {localStorage.getItem("lang") === "en" ? (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                onClick={() => switchLang("fr")}
              >
                <img
                  src="assets/images/french.png"
                  alt="Version française"
                  width={33}
                  className="py-2"
                />
              </button>
            ) : (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                onClick={() => switchLang("en")}
              >
                <img
                  src="assets/images/english.png"
                  alt="English version"
                  width={33}
                  className="py-2"
                />
              </button>
            )}

            <AccessibilityMenu />
          </div>

          <div className="h-7 bg-black dark:bg-gray-300 w-[1px] rounded-full"></div>

          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/admin"
            className="text-dynamic-sm px-2.5 py-1.5 ml-2 mx-1 cursor-pointer hover:translate-[1px] hover:underline p-2 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
          >
            Mon espace
          </Link>
        </div>

        <nav className="flex justify-between items-center">
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/"
            className={`mx-1 px-2.5 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline hover:translate-[1px] ${
              location.pathname === "/" ? "underline" : ""
            }`}
          >
            {t("home.link")}
          </Link>

          <div className="relative" ref={actMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline hover:translate-[1px] ${
                ["/conferences"].includes(location.pathname) ? "underline" : ""
              }`}
              onClick={() => setShowAct(!showAct)}
            >
              <p className="mx-1">{t("news.link")}</p>
              <ChevronDown
                size={26}
                color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
                strokeWidth={2.5}
              />
            </button>

            {showAct && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/conferences"
                  className="dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("news.conferences.link")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={deptMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline hover:translate-[1px] ${
                [
                  "/equipe",
                  "/master",
                  "/lab-chart",
                  "/projets-etudiants",
                  "/prix-concours",
                ].includes(location.pathname)
                  ? "underline"
                  : ""
              }`}
              onClick={() => setShowDept(!showDept)}
            >
              <p className="mx-1">{t("department.link")}</p>
              <ChevronDown
                size={26}
                color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
                strokeWidth={2.5}
              />
            </button>
            {showDept && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/equipe"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.team.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/master"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.master.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/lab-chart"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.lab-chart.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/projets-etudiants"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.projects.title")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/prix-concours"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("department.awards_title")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={collMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline hover:translate-[1px] ${
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
                color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
                strokeWidth={2.5}
              />
            </button>

            {showColl && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white dark:bg-dark-background shadow-md rounded-md font-normal">
                <Link
                  onClick={handleLinkClick}
                  to="/collaboration-nationale"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("collaboration.national.link")}
                </Link>
                <Link
                  onClick={handleLinkClick}
                  to="/collaboration-internationale"
                  className="hover:bg-gray-200 focus:bg-gray-200 dark:bg-dark-background dark:focus:bg-dark-main dark:hover:bg-dark-main rounded-md px-4 py-2"
                >
                  {t("collaboration.international.link")}
                </Link>
              </div>
            )}
          </div>
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/contact"
            className={`px-2.5 py-1.5 mx-1 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg hover:underline hover:translate-[1px] ${
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

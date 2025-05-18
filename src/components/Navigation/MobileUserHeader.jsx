import { ChevronDown, Image, ImageOff, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileUserHeader = ({ switchLang }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuShow = () => {
    setShowMenu((prev) => !prev);
  };

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

  const [minimalTheme, setMinimalTheme] = useState(
    () => localStorage.getItem("minimal-theme") || ""
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (minimalTheme === "minimal") {
      root.classList.add("minimal");
    } else {
      root.classList.remove("minimal");
    }

    localStorage.setItem("minimal-theme", minimalTheme);
  }, [minimalTheme]);

  const toggleTheme = () => {
    setMinimalTheme((prevTheme) => (prevTheme === "" ? "minimal" : ""));
  };

  return (
    <header className="sticky top-0 max-large-medium:block hidden px-7 py-5 bg-main dark:bg-dark-main shadow-medium">
      <div className="flex flex-row items-center justify-between">
        <img
          src="assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={100}
        />
        <button
          type="button"
          aria-controls="menu"
          aria-label="Menu de navigation"
          onClick={onMenuShow}
          className="focus:translate-[1px]"
        >
          <Menu size={36} color="#232323" strokeWidth={3} />
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-[5.5rem] bg-main dark:bg-dark-main w-[80%] min-h-screen">
          <div className="flex items-center">
            {localStorage.getItem("lang") === "en" ? (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main rounded-lg"
                onClick={() => switchLang("fr")}
              >
                <img
                  src="assets/images/french.png"
                  alt="Version française"
                  width={33}
                  className="py-3"
                />
              </button>
            ) : (
              <button
                className="cursor-pointer w-fit flex justify-end items-center px-2 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main rounded-lg"
                onClick={() => switchLang("en")}
              >
                <img
                  src="assets/images/english.png"
                  alt="English version"
                  width={33}
                  className="py-3"
                />
              </button>
            )}

            <button
              className="cursor-pointer w-fit flex justify-end items-center p-1 mx-2 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main rounded-lg"
              onClick={toggleTheme}
              aria-label={
                minimalTheme === "minimal"
                  ? "Thème par défaut"
                  : "Thème minimaliste"
              }
            >
              {minimalTheme === "minimal" ? (
                <Image color="#232323" size={28} />
              ) : (
                <ImageOff color="#232323" size={28} />
              )}
            </button>

            <ThemeSwitch />
          </div>

          <nav className="flex flex-col justify-between w-full">
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              to="/"
              className={`px-5 py-3 w-full font-medium hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                location.pathname === "/" ? "underline" : ""
              }`}
            >
              {t("home.link")}
            </Link>

            <div ref={actMenuRef}>
              <button
                className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
                  ["/conferences"].includes(location.pathname)
                    ? "underline"
                    : ""
                }`}
                onClick={() => setShowAct(!showAct)}
              >
                <p className="mx-1">{t("news.link")}</p>
                <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
              </button>

              {showAct && (
                <div className="flex flex-col left-2 bg-white font-normal">
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/conferences"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("news.conferences.link")}
                  </Link>
                </div>
              )}
            </div>

            <div ref={deptMenuRef}>
              <button
                className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
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
                <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
              </button>
              {showDept && (
                <div className="flex flex-col left-2 bg-white font-normal">
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/equipe"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("department.team.link")}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/master"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("department.master.link")}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/lab-chart"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("department.lab-chart.link")}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/projets-etudiants"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("department.projects_title")}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/prix-concours"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("department.awards_title")}
                  </Link>
                </div>
              )}
            </div>

            <div ref={collMenuRef}>
              <button
                className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main hover:underline hover:translate-[1px] ${
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
                <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
              </button>

              {showColl && (
                <div className="flex flex-col left-2 bg-white font-normal">
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/collaboration-nationale"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("collaboration.national.link")}
                  </Link>
                  <Link
                    onClick={() => window.scrollTo({ top: 0 })}
                    to="/collaboration-internationale"
                    className="hover:bg-gray-200 focus:bg-gray-200 px-4 py-3"
                  >
                    {t("collaboration.international.link")}
                  </Link>
                </div>
              )}
            </div>
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              to="/contact"
              className={`px-5 py-3 hover:bg-hover-main focus:bg-hover-main w-full font-medium hover:underline hover:translate-[1px] ${
                location.pathname === "/contact" ? "underline" : ""
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MobileUserHeader;

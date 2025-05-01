import { ChevronDown, Moon, SunMedium } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  return (
    <header className="flex justify-between items-end font-main text-nav font-medium py-4 px-10 bg-main">
      <img
        src="/assets/vectors/Logo.svg"
        alt="Logo de l'universite Paris 8"
        width={140}
      />

      <div className="flex flex-col items-end">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <button
              className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px]"
              onClick={() => switchLang("fr")}
            >
              <img
                src="/assets/images/french.png"
                alt="Version française"
                width={33}
              />
            </button>
            <button
              className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px]"
              onClick={() => switchLang("en")}
            >
              <img
                src="/assets/images/english.png"
                alt="English version"
                width={33}
              />
            </button>
          </div>

          <button className="ml-1 cursor-pointer hover:translate-[1px]">
            <SunMedium size={33} strokeWidth={2} />
          </button>
          <button className="ml-1 cursor-pointer hover:translate-[1px]">
            <Moon size={28} strokeWidth={2.2} />
          </button>

          <Link
            to="/admin"
            className="ml-1 cursor-pointer hover:translate-[1px]"
          >
            Mon espace
          </Link>
        </div>

        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className={`mx-3 hover:underline hover:translate-[1px] ${
              location.pathname === "/" ? "underline" : ""
            }`}
          >
            {t("home.link")}
          </Link>

          <div className="relative" ref={actMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px] ${
                ["/conferences"].includes(location.pathname) ? "underline" : ""
              }`}
              onClick={() => setShowAct(!showAct)}
            >
              <p className="mx-1">{t("news.link")}</p>
              <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
            </button>

            {showAct && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white shadow-md rounded-md font-normal">
                <Link
                  to="/conferences"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("news.conferences.link")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={deptMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px] ${
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
              <div className="absolute flex flex-col left-2 mt-1 bg-white shadow-md rounded-md font-normal">
                <Link
                  to="/equipe"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("department.team.link")}
                </Link>
                <Link
                  to="/master"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("department.master.link")}
                </Link>
                <Link
                  to="/lab-chart"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("department.lab-chart.link")}
                </Link>
                <Link
                  to="/projets-etudiants"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("department.projects_title")}
                </Link>
                <Link
                  to="/prix-concours"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("department.awards_title")}
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={collMenuRef}>
            <button
              className={`cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px] ${
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
              <div className="absolute flex flex-col left-2 mt-1 bg-white shadow-md rounded-md font-normal">
                <Link
                  to="/collaboration-nationale"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("collaboration.national.link")}
                </Link>
                <Link
                  to="/collaboration-internationale"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  {t("collaboration.international.link")}
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/contact"
            className={`ml-3 mr-2 hover:underline hover:translate-[1px] ${
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

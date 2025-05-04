import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="flex flex-col items-center py-4 px-10 bg-main dark:bg-dark-main dark:text-black">
      <div className="flex justify-between items-center w-full">
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={150}
        />

        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col">
          <label
            htmlFor="newsletter"
            className="text-nav font-main font-medium mb-2"
          >
            Newsletter
          </label>

          <div className="ml-2 text-body">
            <input
              type="email"
              name="newsletter"
              id="newsletter"
              placeholder="example@mail.com"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
            />
            <button
              type="submit"
              className="cursor-pointer bg-accent dark:bg-dark-accent font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>

      <div className="border-black border-[1px] my-5 w-full"></div>

      <div className="flex justify-between items-end w-full">
        <div className="flex items-center">
          {localStorage.getItem("lang") === "en" ? (
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
          ) : (
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
          )}
        </div>

        <nav className="flex justify-between font-main text-nav">
          <div className="flex flex-col mx-5">
            <Link className="my-1 hover:translate-[1px] hover:underline" to="/">
              {t("home.link")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/contact"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">{t("news.link")}</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/conférences"
            >
              {t("news.conferences.link")}
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">{t("department.link")}</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/équipe"
            >
              {t("department.team.link")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/master"
            >
              {t("department.master.link")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/lab-chart"
            >
              {t("department.lab-chart.link")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/projets-étudiants"
            >
              {t("department.projects_title")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/prix-concours"
            >
              {t("department.awards_title")}
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">Collaboration</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/collaboration-nationale"
            >
              {t("collaboration.national.link")}
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/collaboration-internationale"
            >
              {t("collaboration.international.link")}
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="mx-1">Accessibilité</p>
        <p className="mx-1">|</p>
        <p className="mx-1">Crédits</p>
        <p className="mx-1">|</p>
        <p className="mx-1">Mentions légales</p>
        <p className="mx-1">|</p>
        <p className="mx-1">Politique de confidentialité</p>
        <p className="mx-1">|</p>
        <p className="mx-1">@2025 Paris 8 - Droits d'auteurs</p>
      </div>
    </footer>
  );
};

export default Footer;

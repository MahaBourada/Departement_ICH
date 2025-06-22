import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InputField } from "../Inputs";
import { SmallFilledButton } from "../Buttons";
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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const darkTheme = localStorage.getItem("theme");

  return (
    <footer className="max-large-medium:hidden flex flex-col items-center py-4 px-10 bg-main dark:bg-dark-main dark:text-gray-300 large-medium:text-nav leading-normal">
      <div className="flex justify-between items-center w-full">
        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          width={180}
          className="m-5 hidden dark:block"
        />
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={180}
          className="m-5 block dark:hidden"
        />

        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col"
        >
          <label htmlFor="newsletter" className="font-main font-medium my-2">
            Newsletter
          </label>

          <div className="mx-2">
            <input
              type="email"
              name="newsletter"
              id="newsletter"
              placeholder={t("contact.form.mail_placeholder")}
              className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
              /* value={value}
            onChange={onChange} */
            />

            <SmallFilledButton
              type="submit"
              text="S'inscrire"
            />
          </div>
        </form>
      </div>

      <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

      <div className="flex justify-between items-end w-full">
        <div className="flex items-center">
          {localStorage.getItem("lang") === "en" ? (
            <button
              className="cursor-pointer w-fit flex justify-end items-center mx-1 hover:underline p-2 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
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
              className="cursor-pointer w-fit flex justify-end items-center mx-1 hover:underline p-2 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
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

          <AccessibilityMenu position="bottom-[3.8rem] left-0" />
        </div>

        <nav className="flex justify-between font-main text-nav">
          <div className="flex flex-col px-2">
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/"
            >
              {t("home.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="mx-1 p-2 font-medium">{t("department.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/departement/actualites"
            >
              {t("department.news.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/departement/equipe"
            >
              {t("department.team.link")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">{t("formation.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/formation/master"
            >
              {t("formation.master.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/formation/projets-etudiants"
            >
              {t("formation.projects.title")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/lab-chart"
            >
              {t("formation.awards_title")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">{t("research.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/recherche/lab-chart"
            >
              {t("research.lab-chart.link")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">Collaboration</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/collaboration-nationale"
            >
              {t("collaboration.national.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
                  : "hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg"
              }
              to="/collaboration-internationale"
            >
              {t("collaboration.international.link")}
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="flex justify-between items-center mt-10">
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

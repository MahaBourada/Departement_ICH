import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InputField } from "../Inputs";
import { SmallFilledButton } from "../Buttons";

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
    <footer className="max-large-medium:hidden flex flex-col items-center py-4 px-10 bg-main dark:bg-dark-main dark:text-black large-medium:text-dynamic-lg lg:text-dynamic-lg">
      <div className="flex justify-between items-center w-full">
        <img
          src="assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={150}
        />

        <form onSubmit={(e) => onSubmit(e)} className="flex flex-row items-end">
          <div className="my-1">
            <InputField
              type="email"
              label="Newsletter"
              name="newsletter"
              placeholder={t("contact.form.mail_placeholder")}
            />
          </div>

          <SmallFilledButton
            type="submit"
            bgColor="bg-accent"
            color="text-black"
            text="S'inscrire"
          />
        </form>
      </div>

      <div className="border-black border-[1px] my-5 w-full"></div>

      <div className="flex justify-between items-end w-full">
        <div className="flex items-center">
          {localStorage.getItem("lang") === "en" ? (
            <button
              className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px] p-2 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              onClick={() => switchLang("fr")}
            >
              <img
                src="assets/images/french.png"
                alt="Version française"
                width={42}
              />
            </button>
          ) : (
            <button
              className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px] p-2 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              onClick={() => switchLang("en")}
            >
              <img
                src="assets/images/english.png"
                alt="English version"
                width={42}
              />
            </button>
          )}
        </div>

        <nav className="flex justify-between font-main text-dynamic-base">
          <div className="flex flex-col px-2">
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/"
            >
              {t("home.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="mx-1 p-2 font-medium">{t("news.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/conferences"
            >
              {t("news.conferences.link")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">{t("department.link")}</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/equipe"
            >
              {t("department.team.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/master"
            >
              {t("department.master.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/lab-chart"
            >
              {t("department.lab-chart.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/projets-etudiants"
            >
              {t("department.projects_title")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/prix-concours"
            >
              {t("department.awards_title")}
            </NavLink>
          </div>

          <div className="flex flex-col px-2">
            <p className="p-2 font-medium">Collaboration</p>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/collaboration-nationale"
            >
              {t("collaboration.national.link")}
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              className={({ isActive }) =>
                isActive
                  ? "underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
                  : "hover:translate-[1px] hover:underline mx-1 px-2 py-1.5 hover:bg-hover-main focus:bg-hover-main rounded-lg"
              }
              to="/collaboration-internationale"
            >
              {t("collaboration.international.link")}
            </NavLink>
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

import { ChevronDown, Image, ImageOff, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccessibilityMenu from "../AccessibilityMenu";

const MobileUserHeader = ({ switchLang }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuShow = () => {
    setShowMenu((prev) => !prev);
  };

  const { t } = useTranslation();
  const location = useLocation();

  const [showFormation, setShowFormation] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const [showRecherche, setShowRecherche] = useState(false);
  const [showColl, setShowColl] = useState(false);

  const formationMenuRef = useRef(null);
  const deptMenuRef = useRef(null);
  const rechercheMenuRef = useRef(null);
  const collMenuRef = useRef(null);

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
    };

    if (showFormation || showDept || showRecherche || showColl) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showFormation, showDept, showRecherche, showColl]);

  const handleLinkClick = () => {
    setShowMenu(false);

    setShowFormation(false);
    setShowDept(false);
    setShowRecherche(false);
    setShowColl(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 max-large:block hidden px-7 py-5 bg-main dark:bg-dark-main shadow-medium dark:shadow-gray-900 z-50">
      <div className="flex flex-row items-center justify-between">
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          aria-hidden={localStorage.getItem("theme") === "dark" ? true : false}
          width={100}
          className="block dark:hidden"
        />

        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          aria-hidden={localStorage.getItem("theme") === "dark" ? false : true}
          width={100}
          className="hidden dark:block"
        />

        <button
          type="button"
          aria-label={
            showMenu ? "Fermer le menu" : "Ouvrir le menu de navigation"
          }
          onClick={onMenuShow}
          className="cursor-pointer"
        >
          {showMenu ? (
            <X
              size={36}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={3}
            />
          ) : (
            <Menu
              size={36}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={3}
            />
          )}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-[5.5rem] bg-main dark:bg-dark-main w-[80%] h-[calc(100vh-5.5rem)] overflow-y-auto z-50 flex flex-col items-stretch justify-between">
          <div>
            <div className="mx-auto w-fit">
              <AccessibilityMenu />
            </div>

            <div className="flex items-center justify-center">
              {localStorage.getItem("lang") === "en" ? (
                <button
                  className="cursor-pointer w-fit flex justify-end items-center px-2 transition-colors duration-300 hover:underline hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus rounded-lg"
                  onClick={() => switchLang("fr")}
                >
                  <img
                    src="/ich/assets/images/french.png"
                    alt="Version française"
                    width={33}
                    className="py-3"
                  />
                </button>
              ) : (
                <button
                  className="cursor-pointer w-fit flex justify-end items-center px-2 transition-colors duration-300 hover:underline hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus rounded-lg"
                  onClick={() => switchLang("en")}
                >
                  <img
                    src="/ich/assets/images/english.png"
                    alt="English version"
                    width={33}
                    className="py-3"
                  />
                </button>
              )}

              <div className="h-7 bg-black dark:bg-gray-300 w-[1px] rounded-full"></div>

              <Link
                onClick={handleLinkClick}
                to="/admin"
                className="max-sm:text-[1.125rem] max-large-medium:text-xl font-medium px-2.5 py-1.5 ml-2 mx-1 cursor-pointer hover:underline p-2 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus rounded-lg"
              >
                Mon espace
              </Link>
            </div>

            <nav className="flex flex-col justify-between w-full mt-0.5">
              <Link
                onClick={handleLinkClick}
                to="/"
                className={`px-5 py-3 w-full font-medium hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline ${
                  location.pathname === "/"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
              >
                {t("home.link")}
              </Link>

              <div ref={deptMenuRef}>
                <button
                  className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline hoverfocus:ate-[1px] ${
                    ["/departement/actualites", "/departement/equipe"].includes(
                      location.pathname
                    )
                      ? "underline bg-hover-main dark:bg-dark-main-focus"
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
                  <div className="flex flex-col left-2 bg-[#C1DAF0] font-normal">
                    <Link
                      onClick={handleLinkClick}
                      to="/departement/actualites"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("department.news.link")}
                    </Link>

                    <Link
                      onClick={handleLinkClick}
                      to="/departement/equipe"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("department.team.link")}
                    </Link>
                  </div>
                )}
              </div>

              <div ref={formationMenuRef}>
                <button
                  className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline hoverfocus:ate-[1px] ${
                    [
                      "/formation/master",
                      "/formation/projets-etudiants",
                      "/formation/prix-concours",
                      "/formation/alumni",
                    ].includes(location.pathname)
                      ? "underline bg-hover-main dark:bg-dark-main-focus"
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
                  <div className="flex flex-col left-2 bg-[#C1DAF0] font-normal">
                    <Link
                      onClick={handleLinkClick}
                      to="/formation/master"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("formation.master.link")}
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/formation/projets-etudiants"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("formation.projects.title")}
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/formation/prix-concours"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("formation.awards_title.title")}
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/formation/alumni"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      Alumni
                    </Link>
                  </div>
                )}
              </div>

              <div ref={rechercheMenuRef}>
                <button
                  className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline hoverfocus:ate-[1px] ${
                    ["/recherche/lab-chart"].includes(location.pathname)
                      ? "underline bg-hover-main dark:bg-dark-main-focus"
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
                  <div className="flex flex-col left-2 bg-[#C1DAF0] font-normal">
                    <Link
                      onClick={handleLinkClick}
                      to="/recherche/lab-chart"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("research.lab-chart.link")}
                    </Link>
                  </div>
                )}
              </div>

              <div ref={collMenuRef}>
                <button
                  className={`cursor-pointer flex justify-between items-center w-full font-medium px-4 py-3 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline hoverfocus:ate-[1px] ${
                    [
                      "/collaborations/collaborations-nationales",
                      "/collaborations/collaborations-internationales",
                      "/collaborations/collaborez-avec-nous",
                    ].includes(location.pathname)
                      ? "underline bg-hover-main dark:bg-dark-main-focus"
                      : ""
                  }`}
                  onClick={() => setShowColl(!showColl)}
                >
                  <p className="mx-1">Collaborations</p>
                  <ChevronDown
                    size={26}
                    className="text-[#232323] dark:text-gray-300"
                    strokeWidth={2.5}
                  />
                </button>

                {showColl && (
                  <div className="flex flex-col left-2 bg-[#C1DAF0] font-normal">
                    <Link
                      onClick={handleLinkClick}
                      to="/collaborations/collaborations-nationales"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("collaboration.national.link")}
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/collaborations/collaborations-internationales"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("collaboration.international.link")}
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      to="/collaborations/collaborez-avec-nous"
                      className="hover:bg-hover-main focus:bg-hover-main dark:bg-[#53626E] dark:focus:bg-dark-main-focus dark:hover:bg-dark-main-focus px-4 py-3"
                    >
                      {t("collaboration.form.link")}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                onClick={handleLinkClick}
                to="/contact"
                className={`px-5 py-3 w-full font-medium hover:underline
              hover:bg-hover-main focus:bg-hover-main
              dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus
              ${
                location.pathname === "/contact"
                  ? "underline bg-hover-main dark:bg-dark-main-focus"
                  : ""
              }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col text-start justify-between items-start">
            <Link
              onClick={handleLinkClick}
              to="/accessibilite"
              className={`w-full py-1 px-5 transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline line-clamp-1
                ${
                  location.pathname === "/accessibilite"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
            >
              {t("footer.accessibility")}
            </Link>

            <Link
              to="/credits"
              onClick={handleLinkClick}
              className={`w-full py-1 px-5 transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline line-clamp-1
                ${
                  location.pathname === "/credits"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
            >
              {t("footer.credits")}
            </Link>

            <Link
              to="/mentions-legales"
              onClick={handleLinkClick}
              className={`w-full py-1 px-5 transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline line-clamp-1
                ${
                  location.pathname === "/mentions-legales"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
            >
              {t("footer.mentions")}
            </Link>

            <Link
              to="/politique-confidentialite"
              onClick={handleLinkClick}
              className={`w-full py-1 px-5 transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline line-clamp-1
                ${
                  location.pathname === "/politique-confidentialite"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
            >
              {t("footer.policy")}
            </Link>

            <Link
              to="/droits-auteurs"
              onClick={handleLinkClick}
              className={`w-full py-1 px-5 transition-colors duration-300 hover:bg-hover-main focus:bg-hover-main dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus hover:underline  max-w-full break-words whitespace-normal
                ${
                  location.pathname === "/droits-auteurs"
                    ? "underline bg-hover-main dark:bg-dark-main-focus"
                    : ""
                }`}
            >
              {t("footer.copyright.2")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileUserHeader;

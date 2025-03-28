import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showLang, setShowLang] = useState(false);

  const langMenuRef = useRef(null);

  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false); // Close the menu if clicked outside
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
    <footer className="flex flex-col items-center py-4 px-10 bg-main">
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
              className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>

      <div className="border-black border-[1px] my-5 w-full"></div>

      <div className="flex justify-between items-end w-full">
        {/* <div className="relative w-fit" ref={langMenuRef}>
          {showLang && (
            <div className="z-50 absolute flex flex-col left-2 bottom-14 mt-0 bg-white shadow-md rounded-md font-normal">
              <button className="cursor-pointer hover:bg-gray-200 rounded-md px-3 py-2 w-fit flex justify-end items-center">
                <img
                  src="/assets/images/english.png"
                  alt="Drapeau du Royaume-Uni"
                  width={30}
                />
                <p className="ml-2 mr-4">Anglais</p>
              </button>
            </div>
          )}

          <button
            className="cursor-pointer w-fit flex justify-end items-center mx-3 hover:underline hover:translate-[1px] mb-3"
            onClick={() => setShowLang(!showLang)}
          >
            <img
              src="/assets/images/french.png"
              alt="Drapeau français"
              width={30}
            />
            <p className="ml-2 mr-1">Français</p>
            <ChevronDown size={22} color="#232323" strokeWidth={2} />
          </button>
        </div> */}

        <div className="flex items-center">
          <button
            className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px] mb-2"
            onClick={() => setShowLang(!showLang)}
          >
            <img
              src="/assets/images/french.png"
              alt="Drapeau français"
              width={33}
            />
          </button>
          <button
            className="cursor-pointer w-fit flex justify-end items-center mx-2 hover:underline hover:translate-[1px] mb-2"
            onClick={() => setShowLang(!showLang)}
          >
            <img
              src="/assets/images/english.png"
              alt="Drapeau du Royaume-Uni"
              width={33}
            />
          </button>
        </div>

        <nav className="flex justify-between font-main text-nav">
          <div className="flex flex-col mx-5">
            <Link className="my-1 hover:translate-[1px] hover:underline" to="/">
              Accueil
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/contact"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">Actualités</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/conférences"
            >
              Conférences
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">Département ICH</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/équipe"
            >
              Équipe
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/master"
            >
              Master MIASHS
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/lab-chart"
            >
              Lab CHArt
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/projets-étudiants"
            >
              Projets étudiants
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/prix-concours"
            >
              Prix & concours
            </Link>
          </div>

          <div className="flex flex-col mx-5">
            <p className="my-1 font-medium">Collaboration</p>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/collaboration-nationale"
            >
              Nationale
            </Link>
            <Link
              className="my-1 hover:translate-[1px] hover:underline"
              to="/collaboration-internationale"
            >
              Internationale
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="mx-1 underline">Accessibilité</p>
        <p className="mx-1">|</p>
        <p className="mx-1 underline">Crédits</p>
        <p className="mx-1">|</p>
        <p className="mx-1 underline">Mentions légales</p>
        <p className="mx-1">|</p>
        <p className="mx-1 underline">Politique de confidentialité</p>
        <p className="mx-1">|</p>
        <p className="mx-1 underline">@2025 Paris 8 - Droits d'auteurs</p>
      </div>
    </footer>
  );
};

export default Footer;

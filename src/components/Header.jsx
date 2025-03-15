import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showAct, setShowAct] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const [showColl, setShowColl] = useState(false);
  const [showLang, setShowLang] = useState(false);

  // References for each dropdown menu
  const actMenuRef = useRef(null);
  const deptMenuRef = useRef(null);
  const collMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  // Handle clicks outside of any menu
  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false); // Close the menu if clicked outside
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
        alt="Logo de l'université Paris 8"
        width={175}
      />

      <div className="flex flex-col items-end">
        <div className="relative mb-4" ref={langMenuRef}>
          <button
            className="cursor-pointer w-fit flex justify-end items-center mx-3 hover:underline hover:translate-[1px] mb-3"
            onClick={() => setShowLang(!showLang)}
          >
            <img
              src="/assets/images/french.png"
              alt="Drapeau français"
              width={30}
            />
            <p className="ml-2 mr-1 font-body font-normal text-body">
              Français
            </p>
            <ChevronDown size={22} color="#232323" strokeWidth={2} />
          </button>

          {showLang && (
            <div className="z-50 absolute flex flex-col left-2 mt-0 bg-white shadow-md rounded-md font-normal">
              <button className="cursor-pointer hover:bg-gray-200 rounded-md px-3 py-2 w-fit flex justify-end items-center">
                <img
                  src="/assets/images/english.png"
                  alt="Drapeau du Royaume-Uni"
                  width={30}
                />
                <p className="ml-2 mr-4 font-body font-normal text-body">
                  Anglais
                </p>
              </button>
            </div>
          )}
        </div>

        <nav className="flex justify-between items-center mb-1">
          <Link to="/" className="mx-3 hover:underline hover:translate-[1px]">
            Accueil
          </Link>

          <div className="relative" ref={actMenuRef}>
            <button
              className="cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px]"
              onClick={() => setShowAct(!showAct)}
            >
              <p className="mx-1">Actualités</p>
              <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
            </button>

            {showAct && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white shadow-md rounded-md font-normal">
                <Link
                  to="/conférences"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Conférences
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={deptMenuRef}>
            <button
              className="cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px]"
              onClick={() => setShowDept(!showDept)}
            >
              <p className="mx-1">Département ICH</p>
              <ChevronDown size={26} color="#232323" strokeWidth={2.5} />
            </button>
            {showDept && (
              <div className="absolute flex flex-col left-2 mt-1 bg-white shadow-md rounded-md font-normal">
                <Link
                  to="/équipe"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Équipe
                </Link>
                <Link
                  to="/master"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Master MIASHS
                </Link>
                <Link
                  to="/lab-chart"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Lab CHArt
                </Link>
                <Link
                  to="/projets-étudiants"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Projets étudiants
                </Link>
                <Link
                  to="/prix-concours"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Prix & concours
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={collMenuRef}>
            <button
              className="cursor-pointer flex justify-between items-center mx-3 hover:underline hover:translate-[1px]"
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
                  Nationale
                </Link>
                <Link
                  to="/collaboration-internationale"
                  className="hover:bg-gray-200 rounded-md px-4 py-2"
                >
                  Internationale
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/contact"
            className="mx-3 hover:underline hover:translate-[1px]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

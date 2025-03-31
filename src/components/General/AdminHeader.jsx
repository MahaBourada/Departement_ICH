import { ChevronDown, CircleUserRound } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const actMenuRef = useRef(null);

  const handleClickOutside = (event, setState, menuRef) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setState(false);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showMenu) {
        handleClickOutside(event, setShowMenu, actMenuRef);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <header
      className="m-5 mx-6 ml-auto relative w-fit"
      ref={actMenuRef}
      aria-label="Profile"
    >
      <button
        className="flex items-center justify-between w-fit cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => setShowMenu(!showMenu)}
      >
        <ChevronDown
          size={32}
          color="#232323"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <p className="text-2xl font-semibold mx-2">Anis ROJBI</p>
        <CircleUserRound size={34} color="#232323" aria-hidden="true" />
      </button>

      {showMenu && (
        <div className="absolute flex flex-col right-2 top-9 mt-1 bg-white shadow-md rounded-md font-normal w-full">
          <Link
            to="/admin"
            className="hover:bg-gray-200 rounded-md px-4 py-2"
          >
            Déconnexion
          </Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;

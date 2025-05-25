import { ChevronDown, CircleUserRound } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { UserContext } from "../../contexts/UserContext.jsx";
import AccessibilityMenu from "../AccessibilityMenu.jsx";

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

  const navigate = useNavigate();

  const { user, setUser, setAccessToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.get("/auth/logout", {
        withCredentials: true,
      });

      setAccessToken(null);
      setUser(null);

      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="m-5 mx-6 ml-auto relative w-fit max-md:hidden flex flex-col items-end justify-between"
      ref={actMenuRef}
      aria-label="Profile"
    >
      <AccessibilityMenu />

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
        <p className="text-dynamic-lg font-semibold mx-2">
          {user?.first_name + " " + user?.last_name.toUpperCase()}
        </p>
        <CircleUserRound size={34} color="#232323" aria-hidden="true" />
      </button>

      {showMenu && (
        <form
          onSubmit={handleSubmit}
          className="absolute flex flex-col right-0 top-[5.75rem] mt-1 bg-white shadow-small rounded-md font-normal w-full"
        >
          <button
            type="submit"
            className="hover:bg-gray-200 rounded-md px-4 py-2 cursor-pointer"
          >
            Déconnexion
          </button>
        </form>
      )}
    </header>
  );
};

export default AdminHeader;

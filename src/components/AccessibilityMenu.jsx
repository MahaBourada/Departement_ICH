import {
  BookOpen,
  BookOpenCheck,
  Check,
  Moon,
  PersonStanding,
  RotateCcw,
  Sun,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AccessibilityMenu = ({ position, hoverColor }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const showMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showMenu &&
        showMenuRef.current &&
        !showMenuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  // Dark theme
  const [darkTheme, setDarkTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", darkTheme);
  }, [darkTheme]);

  const toggleDarkTheme = () => {
    setDarkTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      return newTheme;
    });
  };

  // Zoom in / Zoom out / Reset
  const [fontSize, setFontSize] = useState(() => {
    // Get from localStorage or default to 1.4
    return parseFloat(localStorage.getItem("fontSize")) || 1.4;
  });

  const [leading, setLeading] = useState(() => {
    // Get from localStorage or default to 1.4
    return parseFloat(localStorage.getItem("leading")) || 1.5;
  });

  const MIN_FONT_SIZE = 1.35;
  const MAX_FONT_SIZE = 1.85;

  const MIN_LEADING = 2.75;
  const MAX_LEADING = 5;

  const isZoomInDisabled = fontSize >= MAX_FONT_SIZE;
  const isZoomOutDisabled = fontSize <= MIN_FONT_SIZE;

  useEffect(() => {
    document.documentElement.style.setProperty("--font-base", `${fontSize}rem`);
    document.documentElement.style.setProperty(
      "--leading-base",
      `${leading}rem`
    );
    localStorage.setItem("fontSize", fontSize); // Persist
    localStorage.setItem("leading", leading); // Persist
  }, [fontSize, leading]);

  const zoomIn = () => {
    setFontSize((prev) => Math.min(prev * 1.1, MAX_FONT_SIZE));
    setLeading((prev) => Math.min(prev * 1.1, MAX_LEADING));
  };

  const zoomOut = () => {
    setFontSize((prev) => Math.max(prev / 1.1, MIN_FONT_SIZE));
    setLeading((prev) => Math.max(prev / 1.1, MIN_LEADING));
  };

  const resetZoom = () => {
    setFontSize(MIN_FONT_SIZE);
    setLeading(MIN_LEADING);
  };

  const isMobile = window.innerWidth <= 1024;

  // Reader mode

  const [readerMode, setReaderMode] = useState(
    () => localStorage.getItem("readerMode") === "true"
  );

  const toggleReaderMode = () => {
    setReaderMode((prev) => {
      const newValue = !prev;

      return newValue;
    });
  };

  // Dyslexia theme
  const [dyslexiaTheme, setDyslexiaTheme] = useState(
    () => localStorage.getItem("dyslexiaTheme") === "true"
  );

  const toggleDyslexiaTheme = () => {
    setDyslexiaTheme((prev) => {
      const newValue = !prev;

      return newValue;
    });
  };

  useEffect(() => {
    const root = document.documentElement;

    const applyFontSettings = () => {
      if (dyslexiaTheme) {
        root.style.setProperty("--font-base", `1.75rem`);
        root.style.setProperty("--leading-base", `4rem`);
      } else if (readerMode) {
        root.style.setProperty("--font-base", `1.75rem`);
        root.style.setProperty("--leading-base", `4rem`);
      } else {
        root.style.setProperty("--font-base", `${fontSize}rem`);
        root.style.setProperty("--leading-base", `${leading}rem`);
      }
    };

    // Apply class names
    if (dyslexiaTheme) {
      root.classList.add("dyslexiaTheme");
    } else {
      root.classList.remove("dyslexiaTheme");
    }

    if (readerMode) {
      root.classList.add("readerMode");
    } else {
      root.classList.remove("readerMode");
    }

    // Apply correct font size / leading
    applyFontSettings();

    // Save theme states
    localStorage.setItem("readerMode", readerMode);
    localStorage.setItem("dyslexiaTheme", dyslexiaTheme);
  }, [readerMode, dyslexiaTheme, fontSize, leading]);

  const location = useLocation();

  return (
    <div
      className="relative my-1 rounded-lg font-main dyslexiaTheme:font-dyslexia text-nav max-sm:text-[1.125rem] leading-normal"
      ref={showMenuRef}
    >
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={`cursor-pointer w-fit flex justify-end items-center px-2 mx-1 py-1.5 transition-colors duration-300 hover:underline hover:bg-hover-main focus:bg-hover-main ${
          hoverColor
            ? `dark:hover:${hoverColor} dark:focus:${hoverColor}`
            : "dark:hover:bg-dark-main-focus dark:focus:bg-dark-main-focus"
        } rounded-lg font-medium`}
      >
        <span className="mx-1">{t("accessibility.label")}</span>
        <PersonStanding
          size={28}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={3.2}
        />
      </button>

      {showMenu && (
        <div
          className={`absolute right-0 ${position} z-50 mt-1 w-fit bg-white dark:bg-dark-background rounded-lg shadow-small dark:shadow-gray-900 font-normal`}
        >
          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={toggleDarkTheme}
          >
            {darkTheme === "light" ? (
              <>
                <span className="mr-2">{t("accessibility.dark")}</span>
                <Moon size={29} className="text-[#232323] dark:text-gray-300" />
              </>
            ) : (
              <>
                <span className="mr-2">{t("accessibility.light")}</span>
                <Sun size={29} className="text-[#232323] dark:text-gray-300" />
              </>
            )}
          </button>

          {!isMobile && (
            <button
              type="button"
              className={`flex justify-between items-center bg-white dark:bg-dark-background px-3 py-1.5 text-nowrap w-full rounded-lg ${
                isZoomInDisabled
                  ? "opacity-55 cursor-not-allowed"
                  : "cursor-pointer transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:hover:bg-dark-main dark:focus:bg-dark-main"
              }`}
              onClick={zoomIn}
              disabled={isZoomInDisabled}
            >
              <span>Zoom +</span>
              <ZoomIn size={29} className="text-[#232323] dark:text-gray-300" />
            </button>
          )}

          {!isMobile && (
            <button
              type="button"
              className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
              onClick={resetZoom}
            >
              <span>{t("accessibility.reset")}</span>
              <RotateCcw
                size={28}
                className="text-[#232323] dark:text-gray-300"
              />
            </button>
          )}

          {!isMobile && (
            <button
              type="button"
              className={`flex justify-between items-center bg-white dark:bg-dark-background px-3 py-1.5 text-nowrap w-full rounded-lg ${
                isZoomOutDisabled
                  ? "opacity-55 cursor-not-allowed"
                  : "cursor-pointer transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:hover:bg-dark-main dark:focus:bg-dark-main"
              }`}
              onClick={zoomOut}
              disabled={isZoomOutDisabled}
            >
              <span>Zoom -</span>
              <ZoomOut
                size={29}
                className="text-[#232323] dark:text-gray-300"
              />
            </button>
          )}

          {!location.pathname.includes("/admin") && (
            <button
              type="button"
              className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
              onClick={toggleReaderMode}
            >
              <span className="mr-2">{t("accessibility.reader")}</span>
              {readerMode ? (
                <BookOpenCheck
                  size={29}
                  className="text-[#232323] dark:text-gray-300"
                />
              ) : (
                <BookOpen
                  size={29}
                  className="text-[#232323] dark:text-gray-300"
                />
              )}
            </button>
          )}

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background transition-colors duration-300 hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={toggleDyslexiaTheme}
          >
            <span className="mr-2">{t("accessibility.dyslexia")}</span>
            {dyslexiaTheme ? (
              <Check size={29} className="text-[#232323] dark:text-gray-300" />
            ) : (
              <X size={29} className="text-[#232323] dark:text-gray-300" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;

import {
  BookOpen,
  BookOpenCheck,
  Moon,
  PersonStanding,
  RotateCcw,
  Sun,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const AccessibilityMenu = ({ position }) => {
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

  // Reader mode
  const [readerMode, setReaderMode] = useState(
    () => localStorage.getItem("readerMode") === "true"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (readerMode) {
      root.classList.add("readerMode");
    } else {
      root.classList.remove("readerMode");
    }

    localStorage.setItem("readerMode", readerMode);
  }, [readerMode]);

  const toggleReaderMode = () => {
    setReaderMode((prev) => {
      const newValue = !prev;

      return newValue;
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

  return (
    <div
      className="relative my-1 rounded-lg font-body text-nav leading-normal"
      ref={showMenuRef}
    >
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer w-fit flex justify-end items-center px-2 mx-1 py-1.5 hover:underline hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg font-medium"
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
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
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

          <button
            type="button"
            className={`flex justify-between items-center bg-white dark:bg-dark-background px-3 py-1.5 text-nowrap w-full rounded-lg ${
              isZoomInDisabled
                ? "opacity-55 cursor-not-allowed"
                : "cursor-pointer hover:bg-bg-crumb focus:bg-bg-crumb dark:hover:bg-dark-main dark:focus:bg-dark-main"
            }`}
            onClick={zoomIn}
            disabled={isZoomInDisabled}
          >
            <span>Zoom +</span>
            <ZoomIn size={29} className="text-[#232323] dark:text-gray-300" />
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={resetZoom}
          >
            <span>{t("accessibility.reset")}</span>
            <RotateCcw
              size={28}
              className="text-[#232323] dark:text-gray-300"
            />
          </button>

          <button
            type="button"
            className={`flex justify-between items-center bg-white dark:bg-dark-background px-3 py-1.5 text-nowrap w-full rounded-lg ${
              isZoomOutDisabled
                ? "opacity-55 cursor-not-allowed"
                : "cursor-pointer hover:bg-bg-crumb focus:bg-bg-crumb dark:hover:bg-dark-main dark:focus:bg-dark-main"
            }`}
            onClick={zoomOut}
            disabled={isZoomOutDisabled}
          >
            <span>Zoom -</span>
            <ZoomOut size={29} className="text-[#232323] dark:text-gray-300" />
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-bg-crumb focus:bg-bg-crumb dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
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
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;

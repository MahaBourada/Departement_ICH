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

const AccessibilityMenu = () => {
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
      if (newTheme === "dark" && readerMode === true) setReaderMode(false);
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
      if (newValue) {
        setDarkTheme("light"); // force light mode if readerMode is turned on
      }
      return newValue;
    });
  };

  // Zoom in / Zoom out / Reset
  const [fontSize, setFontSize] = useState(() => {
    // Get from localStorage or default to 1.25
    return parseFloat(localStorage.getItem("fontSize")) || 1.25;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--font-base", `${fontSize}rem`);
    localStorage.setItem("fontSize", fontSize); // Persist
  }, [fontSize]);

  const zoomIn = () => {
    setFontSize((prev) => Math.min(prev * 1.1, 1.5));
  };

  const zoomOut = () => {
    setFontSize((prev) => Math.max(prev / 1.1, 1.25));
  };

  const resetZoom = () => {
    setFontSize(1.25);
  };

  return (
    <div className="relative my-1 rounded-lg" ref={showMenuRef}>
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer w-fit flex justify-end items-center px-3 py-1.5 hover:underline hover:translate-[1px] hover:bg-hover-main focus:bg-hover-main dark:hover:bg-gray-900 dark:focus:bg-gray-900 rounded-lg font-medium"
      >
        <span className="mx-1 text-dynamic-sm">{t('accessibility.label')}</span>
        <PersonStanding
          size={28}
          color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
          strokeWidth={3.2}
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 z-50 mt-1 w-fit bg-white dark:bg-dark-background rounded-lg shadow-small dark:shadow-gray-900 font-normal">
          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={toggleDarkTheme}
          >
            {darkTheme === "light" ? (
              <>
                <span className="mr-2">{t('accessibility.dark')}</span>
                <Moon
                  size={29}
                  color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
                />
              </>
            ) : (
              <>
                <span className="mr-2">{t('accessibility.light')}</span>
                <Sun
                  size={29}
                  color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
                />
              </>
            )}
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={zoomIn}
          >
            <span>Zoom +</span>
            <ZoomIn
              size={29}
              color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
            />
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={resetZoom}
          >
            <span>{t('accessibility.reset')}</span>
            <RotateCcw
              size={28}
              color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
            />
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={zoomOut}
          >
            <span>Zoom -</span>
            <ZoomOut
              size={29}
              color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
            />
          </button>

          <button
            type="button"
            className="cursor-pointer flex justify-between items-center bg-white dark:bg-dark-background hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-dark-main dark:hover:bg-dark-main px-3 py-1.5 text-nowrap w-full rounded-lg"
            onClick={toggleReaderMode}
          >
            <span className="mr-2">{t('accessibility.reader')}</span>
            {readerMode ? (
              <BookOpenCheck
                size={29}
                color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
              />
            ) : (
              <BookOpen
                size={29}
                color={darkTheme === "dark" ? "#d1d5dc" : "#232323"}
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;

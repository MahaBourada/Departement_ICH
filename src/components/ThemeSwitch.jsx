import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      type="button"
      className="hover:translate-x-[1px] hover:translate-y-[1px] p-1 mr-2 hover:bg-hover-main focus:bg-hover-main rounded-lg"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Thème sombre" : "Thème clair"}
    >
      {theme === "light" ? (
        <Moon color="#232323" size={28} className="cursor-pointer" />
      ) : (
        <Sun color="#232323" size={28} className="cursor-pointer" />
      )}
    </button>
  );
};

export default ThemeSwitch;

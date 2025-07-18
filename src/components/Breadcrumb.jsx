import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Breadcrumb = ({ crumbs }) => {
  const { t } = useTranslation();
  return (
    <nav
      aria-label={t("breadcrumb")}
      className="mb-10 my-1 p-1.5 py-1 w-full bg-bg-crumb rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-dark-bg-crumb leading-loose text-breadcrumb"
    >
      {crumbs.map((crumb, index) => (
        <div key={index} className="flex flex-row items-center">
          {crumb.link ? (
            <Link
              to={crumb.link}
              className="px-4 py-1 rounded-xl transition-colors duration-300 hover:underline hover:bg-hover-crumb dark:hover:bg-dark-hover-crumb"
            >
              {crumb.label}
            </Link>
          ) : (
            <span
              className={`px-4 py-1 rounded-xl ${
                crumbs.length - 1 === index &&
                "text-[#663114] dark:text-dark-white bg-bg-transparent dark:bg-dark-bg-transparent"
              } `}
            >
              {crumb.label}
            </span>
          )}

          {crumbs.length - 1 !== index && (
            <ChevronRight
              size={33}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={2}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;

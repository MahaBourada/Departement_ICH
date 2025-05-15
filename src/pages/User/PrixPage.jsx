import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PrixPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <nav
        aria-label="breadcrumb"
        className="my-1 mb-5 p-1.5 w-fit rounded-xl flex items-center font-medium"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.awards_title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 mb-4">
      {t("department.awards_title")}
      </h1>
    </main>
  );
};

export default PrixPage;

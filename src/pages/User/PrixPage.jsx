import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const PrixPage = () => {
  const { t } = useTranslation();

  const darkTheme = localStorage.getItem("theme");

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: t("formation.link"),
          },
          {
            label: t("formation.awards_title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 mb-4">
        {t("department.awards_title")}
      </h1>
    </main>
  );
};

export default PrixPage;

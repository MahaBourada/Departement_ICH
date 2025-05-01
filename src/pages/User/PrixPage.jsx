import React from "react";
import { useTranslation } from "react-i18next";

const PrixPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <h1 className="font-main font-semibold text-display my-2 mb-4">
      {t("department.awards_title")}
      </h1>
    </main>
  );
};

export default PrixPage;

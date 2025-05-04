import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";

const InternationalePage = () => {
  const { t } = useTranslation();
  const [pageInternational, setPageInternational] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(
        `/pages/collaboration-internationale?lang=${lang}`
      );

      setPageInternational(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {t("collaboration.international.title")}
      </h1>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageInternational, 1),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageInternational, 2),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageInternational, 3),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageInternational, 4),
        }}
      ></div>
    </main>
  );
};

export default InternationalePage;

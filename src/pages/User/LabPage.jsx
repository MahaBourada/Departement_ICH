import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const LabPage = () => {
  const { t } = useTranslation();
  const [pageLab, setPageLab] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/pages/lab-chart?lang=${lang}`);

      setPageLab(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <nav
        aria-label="breadcrumb"
        className="my-1 mb-7 mx-2 p-1.5 w-fit rounded-xl flex items-center font-medium"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent underline hover:translate-[1px]">
          {t("department.lab-chart.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {t("department.lab-chart.title")}
      </h1>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageLab, 1),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageLab, 2),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageLab, 3),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageLab, 4),
        }}
      ></div>
    </main>
  );
};

export default LabPage;

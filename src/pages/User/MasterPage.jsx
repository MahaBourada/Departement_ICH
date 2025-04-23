import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";

const MasterPage = () => {
  const [pageMaster, setPageMaster] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/pages/master?lang=${lang}`);

      setPageMaster(response.data);
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
        Master MIASHS - Parcours Technologie et handicap
      </h1>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageMaster, 1),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageMaster, 2),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageMaster, 3),
        }}
      ></div>

      <div
        className="my-10"
        dangerouslySetInnerHTML={{
          __html: serializeToHtml(pageMaster, 4),
        }}
      ></div>
    </main>
  );
};

export default MasterPage;

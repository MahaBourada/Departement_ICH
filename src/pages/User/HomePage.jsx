import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { serializeToHtml } from "../../utils/slateToHtml";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const [pageAccueil, setPageAccueil] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/pages/accueil?lang=${lang}`);

      setPageAccueil(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow leading-9">
      <div className="h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[url('/assets/images/HomeImage.png')]">
        <h1
          className="text-white bg-bg-transparent py-6 px-7 rounded-4xl font-main font-semibold text-display text-center"
          style={{ textShadow: "2px 2px 5px #333" }}
        >
          {t("home.title.1")}
          <br /> <br />
          {t("home.title.2")}
        </h1>
      </div>

      <div className="my-10 mb-20 mx-16 font-body">
        <div
          className="my-7 mt-10"
          dangerouslySetInnerHTML={{ __html: serializeToHtml(pageAccueil, 1) }}
        ></div>

        <div className="flex justify-between items-start">
          <div className="w-[60%] minimal:w-full mr-10">
            <div
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 2),
              }}
            ></div>

            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 3),
              }}
            ></div>

            <div
              className="my-10"
              dangerouslySetInnerHTML={{
                __html: serializeToHtml(pageAccueil, 4),
              }}
            ></div>
          </div>

          <div className="minimal:hidden w-[33rem] h-[33rem] bg-cover bg-center bg-no-repeat bg-[url('/assets/images/unicorn.jpeg')] rounded-[50px]"></div>
        </div>

        <div className="flex justify-between my-6 minimal:hidden">
          <img src="assets/images/img2.png" alt="" width={400} />
          <img src="assets/images/img3.png" alt="" width={400} />
          <img src="assets/images/Nao.png" alt="" width={400} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

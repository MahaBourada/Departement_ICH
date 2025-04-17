import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { serializeToHtml } from "../../utils/slateToHtml";
import { positions } from "slate";
import api from "../../api/api";

const PagesManagementPage = () => {
  const location = useLocation();
  const { title, link } = location.state || {};

  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [section4, setSection4] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sections = [
      { content: section1, position: 1 },
      { content: section2, position: 2 },
      { content: section3, position: 3 },
      { content: section4, position: 4 },
    ];

    try {
      for (const section of sections) {
        const body = {
          link: link,
          texte: JSON.stringify(section.content),
          ordre_positionnement: section.position,
        };

        await api.post("/pages", body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-14 mt-20">
      <h1 className="text-display font-semibold">Gestion de la {title}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <div className="mt-4">
          <label
            id="section1"
            htmlFor="section1"
            className="text-2xl font-main font-medium"
          >
            Première section *
          </label>
          <RichTextEditor
            aria-labelledby="section1"
            value={section1}
            onChange={setSection1}
          />
        </div>
        <div className="mt-4">
          <label
            id="section2"
            htmlFor="section2"
            className="text-2xl font-main font-medium"
          >
            Deuxième section *
          </label>
          <RichTextEditor
            aria-labelledby="section2"
            value={section2}
            onChange={setSection2}
          />
        </div>
        <div className="mt-4">
          <label
            id="section3"
            htmlFor="section3"
            className="text-2xl font-main font-medium"
          >
            Troisième section *
          </label>
          <RichTextEditor
            aria-labelledby="section3"
            value={section3}
            onChange={setSection3}
          />
        </div>
        <div className="mt-4">
          <label
            id="section4"
            htmlFor="section4"
            className="text-2xl font-main font-medium"
          >
            Quatrième section *
          </label>
          <RichTextEditor
            aria-labelledby="section4"
            value={section4}
            onChange={setSection4}
          />
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="reset"
            className="cursor-pointer bg-white border-1 border-black font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 mx-3 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Modifier
          </button>
        </div>
      </form>
    </main>
  );
};

export default PagesManagementPage;

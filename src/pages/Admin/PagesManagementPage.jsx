import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { serializeToHtml } from "../../utils/slateToHtml";

const PagesManagementPage = () => {
  const { pageSlug } = useParams();
  const [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Start typing here..." }],
    },
  ]);

  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = {
      section1: JSON.stringify(section1),
      section2: JSON.stringify(section2),
      section3: JSON.stringify(section3),
    };

    const section1Html = serializeToHtml(section1);

    console.log(section1Html);
  };

  return (
    <main className="mx-14 mt-20">
      <h1 className="text-display font-semibold">Gestion de la {pageSlug}</h1>

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

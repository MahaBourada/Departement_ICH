import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";

const PagesManagementPage = () => {
  const location = useLocation();
  const { title, link } = location.state || {};

  const [sections, setSections] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const body = {
          link,
          idSection: section.idSection,
          texte_fr: JSON.stringify(section.content_fr),
          texte_en: JSON.stringify(section.content_en),
          ordre_positionnement: i + 1,
        };

        if (section.idSection) {
          await api.put(`/pages/${section.idSection}`, body);
        } else {
          await api.post("/pages", body);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const [resFr, resEn] = await Promise.all([
        api.get(`/pages/${link}?lang=fr`),
        api.get(`/pages/${link}?lang=en`),
      ]);

      const frenchSections = resFr.data;
      const englishSections = resEn.data;

      const maxLength = Math.max(
        frenchSections.length,
        englishSections.length,
        4
      );

      const fetchedSections = Array.from({ length: maxLength }, (_, index) => {
        const frSection = frenchSections[index];
        const enSection = englishSections[index];

        return {
          idSection: frSection?.idSection ?? enSection?.idSection ?? null,
          link,
          content_fr: frSection?.texte
            ? JSON.parse(frSection.texte)
            : defaultContent,
          content_en: enSection?.texte
            ? JSON.parse(enSection.texte)
            : defaultContent,
          position:
            frSection?.ordre_positionnement ??
            enSection?.ordre_positionnement ??
            index,
        };
      });

      setSections(fetchedSections);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  };

  const defaultContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  console.log(sections);

  return (
    <main className="mx-14 mt-20">
      <h1 className="text-display font-semibold">Gestion de la {title}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        {/* <div className="mt-4">
          <label
            id="section1_fr"
            htmlFor="section1_fr"
            className="text-2xl font-main font-medium"
          >
            Première section *
          </label>
          <RichTextEditor
            aria-labelledby="section1_fr"
            value={sections[0].content_fr}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[0].content_fr = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section1_en"
            htmlFor="section1_en"
            className="text-2xl font-main font-medium"
          >
            Traduction de la première section *
          </label>
          <RichTextEditor
            aria-labelledby="section1_en"
            value={sections[0].content_en}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[0].content_en = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section2_fr"
            htmlFor="section2_fr"
            className="text-2xl font-main font-medium"
          >
            Deuxième section *
          </label>
          <RichTextEditor
            aria-labelledby="section2_fr"
            value={sections[1].content_fr}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[1].content_fr = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section2_en"
            htmlFor="section2_en"
            className="text-2xl font-main font-medium"
          >
            Traduction de la deuxième section *
          </label>
          <RichTextEditor
            aria-labelledby="section2_en"
            value={sections[1].content_en}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[1].content_en = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section3_fr"
            htmlFor="section3_fr"
            className="text-2xl font-main font-medium"
          >
            Troisième section *
          </label>
          <RichTextEditor
            aria-labelledby="section3_fr"
            value={sections[2].content_fr}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[2].content_fr = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section3_en"
            htmlFor="section3_en"
            className="text-2xl font-main font-medium"
          >
            Traduction de la troisième section *
          </label>
          <RichTextEditor
            aria-labelledby="section3_en"
            value={sections[2].content_en}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[2].content_en = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section4_fr"
            htmlFor="section4_fr"
            className="text-2xl font-main font-medium"
          >
            Quatrième section *
          </label>
          <RichTextEditor
            aria-labelledby="section4_fr"
            value={sections[3].content_fr}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[3].content_fr = newValue;
              setSections(updated);
            }}
          />
        </div>

        <div className="mt-4">
          <label
            id="section4_en"
            htmlFor="section4_en"
            className="text-2xl font-main font-medium"
          >
            Traduction de la quatrième section *
          </label>
          <RichTextEditor
            aria-labelledby="section4_en"
            value={sections[3].content_en}
            onChange={(newValue) => {
              const updated = [...sections];
              updated[3].content_en = newValue;
              setSections(updated);
            }}
          />
        </div> */}

        {[...sections]
          .sort((a, b) => a.position - b.position)
          .map((section, index) => (
            <div key={index}>
              <div className="mt-4">
                <label
                  id={`section${index + 1}_fr`}
                  htmlFor={`section${index + 1}_fr`}
                  className="text-2xl font-main font-medium"
                >
                  Section {index + 1} - Français
                </label>
                <RichTextEditor
                  aria-labelledby={`section${index + 1}_fr`}
                  value={section.content_fr}
                  onChange={(newValue) => {
                    const updated = [...sections];
                    updated[index].content_fr = newValue;
                    setSections(updated);
                  }}
                />
              </div>

              <div className="mt-4">
                <label
                  id={`section${index + 1}_en`}
                  htmlFor={`section${index + 1}_en`}
                  className="text-2xl font-main font-medium"
                >
                  Section {index + 1} - English
                </label>
                <RichTextEditor
                  aria-labelledby={`section${index + 1}_en`}
                  value={section.content_en}
                  onChange={(newValue) => {
                    const updated = [...sections];
                    updated[index].content_en = newValue;
                    setSections(updated);
                  }}
                />
              </div>
            </div>
          ))}

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

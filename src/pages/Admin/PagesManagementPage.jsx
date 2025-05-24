import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import { ImageField, InputField } from "../../components/Inputs";
import { getRelativePath } from "../../utils/getRelativePath";
import { UserContext } from "../../contexts/UserContext";

const PagesManagementPage = () => {
  const location = useLocation();
  const { accessToken } = useContext(UserContext);
  const { title, link } = location.state || {};

  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

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
          /* const response = await api.put(`/pages/${section.idSection}`, body, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }); */
          const response = await api.put(`/pages/${section.idSection}`, body);

          setMsgShow(true);
          setMsgStatus(200);
          setMsg(response.data.message);
        } else {
          /* const response = await api.post("/pages", body, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }); */
          const response = await api.post("/pages", body);

          setMsgShow(true);
          setMsgStatus(200);
          setMsg(response.data.message);
        }
      }

      for (let img of images) {
        await api.put(`/pages-images/${img.idMedia}`, {
          path: getRelativePath(img.path), // base64 or URL depending on if modified
          alt_fr: img.alt_fr,
          alt_en: img.alt_en,
          ordre_positionnement: img.ordre_positionnement,
          link: link,
        });
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
            frSection?.ordre_positionnement ?? enSection?.ordre_positionnement,
        };
      });

      setSections(fetchedSections);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  };

  const fetchImages = async () => {
    try {
      const [resFr, resEn] = await Promise.all([
        api.get(`/pages-images/${link}?lang=fr`),
        api.get(`/pages-images/${link}?lang=en`),
      ]);

      const frenchAlts = resFr.data;
      const englishAlts = resEn.data;

      const imageData = frenchAlts.map((imgFr, i) => ({
        idMedia: imgFr.idMedia,
        path: `${import.meta.env.VITE_BASE_URL}/${imgFr.path}`,
        alt_fr: imgFr.alt,
        alt_en: englishAlts[i]?.alt ?? "",
        ordre_positionnement: imgFr.ordre_positionnement,
      }));

      setImages(imageData);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleFileChange = (index, e) => {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages) => {
        const updated = [...prevImages];
        if (!updated[index]) return updated; // protect against out-of-bounds
        updated[index] = { ...updated[index], path: reader.result };
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const defaultContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Gestion de la {title}</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

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
              <div className="mt-6">
                <label
                  id={`section${index + 1}_fr`}
                  htmlFor={`section${index + 1}_fr`}
                  className="text-nav font-main font-medium"
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

              <div className="mt-6">
                <label
                  id={`section${index + 1}_en`}
                  htmlFor={`section${index + 1}_en`}
                  className="text-nav font-main font-medium"
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

        {images.map((img, i) => (
          <div key={img.idMedia}>
            <ImageField
              text={`Image ${img.ordre_positionnement}`}
              name={`imagePage${img.ordre_positionnement}`}
              alt={`Image ${img.ordre_positionnement}`}
              file={img.path}
              onChange={(e) => handleFileChange(i, e)}
            />
            <InputField
              type="text"
              label="Alt en français"
              placeholder="Texte ALT FR"
              name={`alt_fr_${i}`}
              value={img.alt_fr}
              onChange={(e) =>
                setImages((prev) => {
                  const updated = [...prev];
                  updated[i] = { ...updated[i], alt_fr: e.target.value };
                  return updated;
                })
              }
            />
            <InputField
              type="text"
              label="Alt en anglais"
              placeholder="Texte ALT EN"
              name={`alt_en_${i}`}
              value={img.alt_en}
              onChange={(e) =>
                setImages((prev) => {
                  const updated = [...prev];
                  updated[i] = { ...updated[i], alt_en: e.target.value };
                  return updated;
                })
              }
            />
          </div>
        ))}

        {/* <ImageField
          text="Image 2 *"
          name="imagePage2"
          alt="Deuxième image"
          file={file}
          onChange={handleFileChange}
        />

        <ImageField
          text="Image 3 *"
          name="imagePage3"
          alt="Troisième image"
          file={file}
          onChange={handleFileChange}
        /> */}

        <div className="flex justify-end mt-3">
          <SmallBorderButton
            type="reset"
            bgColor="bg-white"
            color="text-black"
            borderColor="border-black"
            text="Réinitialiser"
          />

          <SmallFilledButton
            type="submit"
            bgColor="bg-accent"
            color="text-black"
            text="Modifier"
          />
        </div>
      </form>
    </main>
  );
};

export default PagesManagementPage;

import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import { ImageField, InputField } from "../../components/Inputs";
import { getRelativePath } from "../../utils/getRelativePath";
import { UserContext } from "../../contexts/UserContext";

const PagesManagementPage = () => {
  const location = useLocation();
  // const { accessToken } = useContext(UserContext);
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
          texte_fr: section.content_fr,
          texte_en: section.content_en,
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
          content_fr: frSection?.texte,
          content_en: enSection?.texte,
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

      <p className="leading-normal inline-block m-6">
        Veuillez utiliser la syntaxe{" "}
        <strong className="font-semibold">Markdown</strong> pour rédiger le
        contenu des pages.
        <br />
        Voici le lien vers l'aide-mémoire Markdown :&nbsp;
        <a
          className="underline hover:p-0.5 hover:no-underline hover:bg-hover-main rounded-md"
          href="https://www.markdownguide.org/cheat-sheet/"
          title="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown Cheat Sheet
        </a>
        <br />
        <strong className="font-semibold">Remarque :</strong> évitez d'utiliser
        le symbole <code>#</code> pour les titres de niveau&nbsp;1 (heading 1),
        car cela peut provoquer une erreur d'accessibilité dans la hiérarchie
        des titres du site.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        {[...sections]
          .sort((a, b) => a.position - b.position)
          .map((section, index) => (
            <div key={section.idSection || index}>
              <div className="flex flex-col leading-normal mb-3">
                <label
                  htmlFor={`section${index + 1}_fr`}
                  className="font-main font-medium my-2"
                >
                  {`Section ${index + 1} - Français`}
                </label>
                <textarea
                  name={`section${index + 1}_fr`}
                  id={`section${index + 1}_fr`}
                  rows={10}
                  placeholder="Veuillez rédiger votre texte en utilisant la syntaxe Markdown."
                  className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
                  value={section.content_fr}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[index].content_fr = e.target.value;
                    setSections(updated);
                  }}
                />
              </div>

              <div className="flex flex-col leading-normal my-5">
                <label
                  htmlFor={`section${index + 1}_en`}
                  className="font-main font-medium my-2"
                >
                  {`Section ${index + 1} - Anglais`}
                </label>
                <textarea
                  name={`section${index + 1}_en`}
                  id={`section${index + 1}_en`}
                  rows={10}
                  placeholder="Veuillez rédiger votre texte en utilisant la syntaxe Markdown."
                  className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
                  value={section.content_en}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[index].content_en = e.target.value;
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

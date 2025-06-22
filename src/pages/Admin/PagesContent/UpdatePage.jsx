import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import { MessagePopup } from "../../../components/MsgPopup";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import { ImageField, InputField } from "../../../components/Inputs";
import { UserContext } from "../../../contexts/UserContext";

const UpdatePage = () => {
  // const { accessToken } = useContext(UserContext);
  const { idPage } = useParams();
  const [pageInfo, setPageInfo] = useState({});
  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);
  const [initialSections, setInitialSections] = useState([]);
  const [initialImages, setInitialImages] = useState([]);

  // Update fetchData to also set initial values
  const fetchData = async () => {
    try {
      const responseSections = await api.get(`/pages/${idPage}`);
      setPageInfo(responseSections.data);

      const filledSections = Array.from({ length: 4 }, (_, i) => {
        const found = responseSections.data.sections.find(
          (img) => img.ordre_positionnement === i + 1
        );
        return (
          found || {
            ordre_positionnement: i + 1,
            texte_fr: "",
            texte_en: "",
          }
        );
      });
      setSections(filledSections);
      setInitialSections(filledSections); // Save initial

      const responseImages = await api.get(`/pages-images/${idPage}`);
      const filledImages = Array.from({ length: 4 }, (_, i) => {
        const found = responseImages.data.find(
          (img) => img.ordre_positionnement === i + 1
        );
        return (
          found || {
            ordre_positionnement: i + 1,
            path: "",
            alt_fr: "",
            alt_en: "",
          }
        );
      });

      setImages(filledImages);
      setInitialImages(filledImages); // Save initial
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const inputRefs = useRef([]);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updated = [...prevImages];
      if (!updated[index]) return updated;
      const { idMedia, ...rest } = updated[index];
      updated[index] = {
        ...rest,
        path: "",
        alt_fr: "",
        alt_en: "",
      };
      return updated;
    });

    // Clear the actual file input value
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = "";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update sections
      await api.put(`/pages/${idPage}`, sections);

      // Update images
      await api.put(`/pages-images/${idPage}`, {
        link: pageInfo.link,
        images: images,
      });

      setMsg("Mise à jour réussie !");
      setMsgStatus(200); // success
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMsg("Échec de la mise à jour.");
    } finally {
      setMsgShow(true);
    }
  };

  const handleReset = () => {
    setSections(initialSections);
    setImages(initialImages);
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">
        Gestion de la page "{pageInfo.title}"
      </h1>

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
          className="underline p-0.5 hover:no-underline hover:bg-hover-main dark:hover:bg-dark-accent rounded-md"
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
        {sections.map((section, index) => (
          <div key={index}>
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
                value={section.texte_fr}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[index].texte_fr = e.target.value;
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
                value={section.texte_en}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[index].texte_en = e.target.value;
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
              file={
                img.path.startsWith("data:image")
                  ? img.path
                  : `${import.meta.env.VITE_BASE_URL}/${img.path}`
              }
              onChange={(e) => handleFileChange(i, e)}
              onRemove={() => handleRemoveImage(i)}
              inputRef={(el) => (inputRefs.current[i] = el)}
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
          {/* <SmallBorderButton
            type="button"
            text="Réinitialiser"
            onClick={handleReset}
          /> */}

          <SmallFilledButton type="submit" text="Modifier" />
        </div>
      </form>
    </main>
  );
};

export default UpdatePage;

import React, { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";
import { ImageField, InputField, TextAreaField } from "../../components/Inputs";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import { Plus, Trash2 } from "lucide-react";

const ProjectsManagementPage = () => {
  const [images, setImages] = useState([
    { ordre_positionnement: 1, path: "", alt_fr: "", alt_en: "" },
    { ordre_positionnement: 2, path: "", alt_fr: "", alt_en: "" },
    { ordre_positionnement: 3, path: "", alt_fr: "", alt_en: "" },
  ]);

  const [membres, setMembres] = useState([{ prenom: "", nom: "" }]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, membres }));
  }, [membres]);

  const [values, setValues] = useState({
    titre: "",
    objectif: "",
    annee: "",
    membres: [],
    images: [],
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
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

    if (!values.titre) {
      setMsg("Titre est obligatoire");
      setMsgShow(true);
      return;
    }

    const data = {
      ...values,
      membres: membres,
      images: images,
    };
    console.log(data);

    try {
      const response = await api.post("/projects", data);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      const backendMsg = error?.response?.data?.message;

      if (backendMsg) {
        setMsg(backendMsg); // Set the backend message from Express
        setMsgShow(true); // Trigger your popup or message display
      }
    }
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Ajouter un projet</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <p className="leading-normal inline-block my-6">
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

      <form onSubmit={handleSubmit} className="flex flex-col m-5">
        <InputField
          type="text"
          label="Titre *"
          name="titre"
          placeholder="Titre du projet"
          value={values.titre}
          onChange={(e) => setValues({ ...values, titre: e.target.value })}
        />

        <InputField
          type="text"
          label="Année *"
          name="annee"
          placeholder="ex. : 2024/2025"
          value={values.annee}
          onChange={(e) => setValues({ ...values, annee: e.target.value })}
        />

        <TextAreaField
          label="Objectif *"
          name="objectif"
          placeholder="Mini description du projet"
          value={values.objectif}
          onChange={(e) => setValues({ ...values, objectif: e.target.value })}
        />

        <p className="text-dynamic-base font-medium font-main">
          Ajout des membres
        </p>

        {membres.map((membre, index) => (
          <div key={index}>
            <div className="flex items-center justify-between my-3">
              <p className="text-dynamic-base font-medium font-main">
                Membre {index + 1}
              </p>

              <button
                type="button"
                onClick={() => {
                  setMembres((prev) => prev.filter((_, idx) => idx !== index));
                }}
                className="cursor-pointer hover:translate-[1px]"
              >
                <Trash2
                  aria-label="Ajouter un membre"
                  size={30}
                  className="text-[#8B0000] dark:text-red-400"
                  strokeWidth={2.25}
                />
              </button>
            </div>

            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col w-1/2 mr-2">
                <InputField
                  type="text"
                  label="Prénom *"
                  placeholder={`Prénom du membre ${index + 1}`}
                  name="prenom"
                  value={membre.prenom}
                  onChange={(e) =>
                    setMembres((prev) => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        prenom: e.target.value,
                      };
                      return updated;
                    })
                  }
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <InputField
                  type="text"
                  label="Nom *"
                  name="nom"
                  placeholder={`Nom du membre ${index + 1}`}
                  value={membre.nom}
                  onChange={(e) =>
                    setMembres((prev) => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        nom: e.target.value,
                      };
                      return updated;
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <div className="my-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              if (membres.length < 5) {
                setMembres((prev) => [...prev, { prenom: "", nom: "" }]);
              }
            }}
            disabled={membres.length >= 5}
            className="flex items-center cursor-pointer hover:translate-[1px]"
          >
            <Plus
              aria-label="Ajouter un membre du projet"
              size={30}
              className="text-[#232323] dark:text-gray-300"
              strokeWidth={2.8}
            />
            <p>Ajouter un membre</p>
          </button>
        </div>

        {images.map((img, i) => (
          <div key={i}>
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
            text="Ajouter"
          />
        </div>
      </form>
    </main>
  );
};

export default ProjectsManagementPage;

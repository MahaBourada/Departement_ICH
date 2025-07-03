import React, { useState } from "react";
import { MessagePopup } from "../../../components/MsgPopup";
import {
  ImageField,
  InputField,
  TextAreaField,
} from "../../../components/Inputs";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import api from "../../../api/api";

const AddPrix = () => {
  const [values, setValues] = useState({
    nom: "",
    organisation: "",
    projet: "",
    etudiants: "",
    categorie: "",
    description_fr: "",
    description_en: "",
    lien: "",
    image: null,
    alt_fr: "",
    alt_en: "",
  });

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prev) => ({
          ...prev,
          image: reader.result, // store base64 string in your form state
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setValues((prev) => ({
      ...prev,
      image: null, // store base64 string in your form state
    }));
  };

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/prix", values);

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

  const handleReset = () => {
    setValues({
      nom: "",
      organisation: "",
      projet: "",
      etudiants: "",
      categorie: "",
      description_fr: "",
      description_en: "",
      lien: "",
      image: null,
      alt_fr: "",
      alt_en: "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Ajouter un prix</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <p className="leading-normal inline-block my-6">
        Veuillez utiliser la syntaxe{" "}
        <strong className="font-semibold">Markdown</strong> pour rédiger la
        saisie de la description.
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
        le.s symbole.s <code>#</code> pour les titres de
        niveau&nbsp;1,&nbsp;2,&nbsp;3 (heading 1, heading 2, heading 3), car
        cela peut provoquer une erreur d'accessibilité dans la hiérarchie des
        titres du site.
      </p>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col m-5"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom du prix *"
              name="nom"
              placeholder="ex : Concours, Challenge...etc"
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={true}
              type="text"
              label="Organisation *"
              name="organisation"
              placeholder="Organisateur.s du concours"
              value={values.organisation}
              onChange={(e) =>
                setValues({ ...values, organisation: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom du projet *"
              name="projet"
              placeholder="Projet "
              value={values.projet}
              onChange={(e) => setValues({ ...values, projet: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              type="text"
              label="Catégorie"
              name="categorie"
              placeholder="Catégorie"
              value={values.categorie}
              onChange={(e) =>
                setValues({ ...values, categorie: e.target.value })
              }
            />
          </div>
        </div>

        <InputField
          isRequired={true}
          type="text"
          label="Étudiant.s *"
          name="etudiants"
          placeholder="Étudiant(s) qui a (ont) gagné le prix "
          value={values.etudiants}
          onChange={(e) => setValues({ ...values, etudiants: e.target.value })}
        />

        <TextAreaField
          label="Description en français"
          name="description_fr"
          placeholder="Mini description du projet en français"
          value={values.description_fr}
          maxLength={500}
          onChange={(e) =>
            setValues({ ...values, description_fr: e.target.value })
          }
        />

        <TextAreaField
          label="Description en anglais"
          name="description_en"
          placeholder="Mini description du projet en anglais"
          value={values.description_en}
          maxLength={500}
          onChange={(e) =>
            setValues({ ...values, description_en: e.target.value })
          }
        />

        <InputField
          type="url"
          label="Lien"
          name="lien"
          placeholder="https://www.site.com"
          value={values.lien}
          onChange={(e) => setValues({ ...values, lien: e.target.value })}
        />

        <ImageField
          text="Image"
          name="imagePrix"
          alt="Image du prix"
          file={values.image}
          onChange={handleChange}
          onRemove={handleRemoveImage}
        />

        <InputField
          isRequired={values.image !== null}
          type="text"
          label="Courte description de l'image en français"
          name="alt_fr"
          placeholder="Alt français"
          value={values.alt_fr}
          onChange={(e) => setValues({ ...values, alt_fr: e.target.value })}
        />

        <InputField
          isRequired={values.image !== null}
          type="text"
          label="Courte description  de l'image en anglais"
          name="alt_en"
          placeholder="Alt anglais"
          value={values.alt_en}
          onChange={(e) => setValues({ ...values, alt_en: e.target.value })}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton type="reset" text="Réinitialiser" />

          <SmallFilledButton type="submit" text="Ajouter" />
        </div>
      </form>
    </main>
  );
};

export default AddPrix;

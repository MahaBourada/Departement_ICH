import React, { useState } from "react";
import {
  ImageField,
  InputField,
  SelectField,
  TextAreaField,
} from "../../../components/Inputs";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import api from "../../../api/api";
import { MessagePopup } from "../../../components/MsgPopup";

const AddCollab = () => {
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [file, setFile] = useState();
  const [values, setValues] = useState({
    nom_fr: "",
    nom_en: "",
    type: "",
    categorie: "",
    description_fr: "",
    description_en: "",
    logo: "",
  });

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // this is the base64 string like 'data:image/png;base64,...'
        setValues((prev) => ({
          ...prev,
          logo: reader.result, // store base64 string in your form state
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setValues((prev) => ({ ...prev, logo: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
    };

    try {
      const response = await api.post("/collaborations", data);

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
      nom_fr: "",
      nom_en: "",
      type: "",
      categorie: "",
      description_fr: "",
      description_en: "",
      logo: "",
    });
    setFile(null);
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Ajouter une collaboration</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col m-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom de la collaboration *"
              name="nom"
              placeholder="Nom de la collaboration ou de l'organisation"
              value={values.nom_fr}
              onChange={(e) => setValues({ ...values, nom_fr: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom en anglais *"
              name="nom_en"
              placeholder="Nom de l'organisation en anglais"
              value={values.nom_en}
              onChange={(e) => setValues({ ...values, nom_en: e.target.value })}
            />
          </div>
        </div>

        <p
          id="fonction-section-note"
          className="text-gray-800 dark:text-dark-white mt-4"
        >
          Le champ <strong>Catégorie</strong> est obligatoire uniquement si le
          type de la collaboration est <em>Nationale</em>.
        </p>

        <div className="flex items-start justify-between">
          <div className="flex flex-col w-1/2 mr-2">
            <SelectField
              isRequired={true}
              type="text"
              label="Type de la collaboration *"
              name="type"
              placeholder="Sélectionnez un type"
              value={values.type}
              onChange={(e) => setValues({ ...values, type: e.target.value })}
              values={["Nationale", "Internationale"]}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <SelectField
              isRequired={values.type === "Nationale"}
              type="text"
              label="Catégorie *"
              name="categorie"
              placeholder="Sélectionnez une catégorie"
              value={values.categorie}
              onChange={(e) =>
                setValues({ ...values, categorie: e.target.value })
              }
              values={[
                "Hôpital",
                "Université",
                "Partenaire socio-économique",
                "Autre",
              ]}
            />
          </div>
        </div>

        <p className="leading-normal inline-block m-3">
          Veuillez utiliser la syntaxe{" "}
          <strong className="font-semibold">Markdown</strong> pour rédiger les
          descriptions.
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
          <strong className="font-semibold">Remarque :</strong> évitez
          d'utiliser le.s symbole.s <code>#</code> pour les titres de
          niveau&nbsp;1,&nbsp;2,&nbsp;3,&nbsp;4 (heading 1, heading 2, heading
          3, heading 4), car cela peut provoquer une erreur d'accessibilité dans
          la hiérarchie des titres du site.
        </p>

        <TextAreaField
          label="Description en français"
          name="description_fr"
          placeholder="Mini description de la collaboration en français"
          value={values.description_fr}
          maxLength={700}
          onChange={(e) =>
            setValues({ ...values, description_fr: e.target.value })
          }
        />

        <TextAreaField
          label="Description en anglais"
          name="description_en"
          placeholder="Mini description de la collaboration en anglais"
          value={values.description_en}
          maxLength={700}
          onChange={(e) =>
            setValues({ ...values, description_en: e.target.value })
          }
        />

        <ImageField
          text="Logo de la collaboration"
          name="logo"
          alt="Logo de la collaboration"
          file={file}
          onChange={handleChange}
          onRemove={handleRemoveImage}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton type="reset" text="Réinitialiser" />

          <SmallFilledButton type="submit" text="Ajouter" />
        </div>
      </form>
    </main>
  );
};

export default AddCollab;

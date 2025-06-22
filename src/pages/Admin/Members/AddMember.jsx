import React, { useState } from "react";
import api from "../../../api/api";
import { MessagePopup } from "../../../components/MsgPopup";
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

const AddMember = () => {
  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    titre: "",
    fonction: "",
    section: "",
    propos: "",
    image: "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const [file, setFile] = useState();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // this is the base64 string like 'data:image/png;base64,...'
        setValues((prev) => ({
          ...prev,
          image: reader.result, // store base64 string in your form state
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.prenom) {
      setMsg("Prénom est obligatoire");
      setMsgShow(true);
      return;
    }

    if (!values.nom) {
      setMsg("Nom est obligatoire");
      setMsgShow(true);
      return;
    }

    if (!values.titre) {
      setMsg("Titre est obligatoire");
      setMsgShow(true);
      return;
    }

    if (!values.fonction) {
      setMsg("Fonction est obligatoire");
      setMsgShow(true);
      return;
    }

    const data = {
      ...values,
    };

    try {
      const response = await api.post("/members", data);

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
      prenom: "",
      nom: "",
      titre: "",
      fonction: "",
      section: "",
      propos: "",
      image: "",
    });
    setFile(null);
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Ajouter un membre</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

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
              label="Prénom *"
              name="prenom"
              placeholder="Jane"
              value={values.prenom}
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom *"
              name="nom"
              placeholder="DOE"
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
        </div>

        <ImageField
          text="Image *"
          name="imageMembre"
          alt="Image du membre"
          file={file}
          onChange={handleChange}
        />

        <p
          id="fonction-section-note"
          className="text-gray-800 dark:text-dark-white mb-2"
        >
          Les champs <strong>Fonction</strong> et{" "}
          <strong>Section disciplinaire</strong> sont obligatoires uniquement si
          le titre est <em>Directeur du département</em> ou{" "}
          <em>Enseignant(e)</em>.
        </p>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <SelectField
              isRequired={true}
              label="Titre *"
              placeholder="Selectionez un titre"
              name="titre"
              value={values.titre}
              onChange={(e) => setValues({ ...values, titre: e.target.value })}
              values={[
                "Directeur du département",
                "Administration",
                "Enseignant(e)",
              ]}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={
                values.titre === "Directeur du département" ||
                values.titre === "Enseignant(e)"
              }
              type="text"
              label="Fonction"
              name="fonction"
              placeholder="ex : Maître de conférences"
              value={values.fonction}
              onChange={(e) =>
                setValues({ ...values, fonction: e.target.value })
              }
              aria-describedby="fonction-section-note"
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <InputField
            isRequired={
              values.titre === "Directeur du département" ||
              values.titre === "Enseignant(e)"
            }
            type="text"
            label="Section disciplinaire"
            name="section"
            placeholder="ex : 61e section (CNU) : Génie informatique, Automatique, Traitement du signal"
            value={values.section}
            onChange={(e) => setValues({ ...values, section: e.target.value })}
            aria-describedby="fonction-section-note"
          />
        </div>

        <p className="leading-normal inline-block m-3">
          Veuillez utiliser la syntaxe{" "}
          <strong className="font-semibold">Markdown</strong> pour rédiger le "à
          propos".
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
          label="A propos"
          name="propos"
          placeholder="Mini description du membre"
          value={values.propos}
          maxLength={500}
          onChange={(e) => setValues({ ...values, propos: e.target.value })}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton type="reset" text="Réinitialiser" />

          <SmallFilledButton type="submit" text="Ajouter" />
        </div>
      </form>
    </main>
  );
};

export default AddMember;

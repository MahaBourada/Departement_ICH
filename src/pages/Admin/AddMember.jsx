import React, { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";
import { ImageField, InputField } from "../../components/Inputs";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";

const MembersManagementPage = () => {
  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    titre: "",
    fonction: "",
    section: "",
    propos: "",
    email: "",
    telephone: "",
    lieu: "",
    image_blob: "",
  });

  const defaultContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

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
          image_blob: reader.result, // store base64 string in your form state
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
      propos: JSON.stringify(values.propos || defaultContent),
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

  return (
    <main className="mx-14 my-20">
      <h1 className="text-dynamic-2xl font-semibold">Ajouter un membre</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
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

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <label
              htmlFor="titre"
              className="text-dynamic-lg font-main font-medium my-1"
            >
              Titre *
            </label>
            <select
              name="titre"
              id="titre"
              className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.95rem] mr-2 outline-none"
              onChange={(e) => setValues({ ...values, titre: e.target.value })}
            >
              <option value="">Selectionez un titre</option>
              <option value="Directeur du département">
                Directeur du département
              </option>
              <option value="Administration">Administration</option>
              <option value="Enseignant(e)">Enseignant(e)</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              type="text"
              label="Fonction *"
              name="fonction"
              placeholder="ex : Maître de conférences"
              value={values.fonction}
              onChange={(e) =>
                setValues({ ...values, fonction: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <InputField
            type="text"
            label="Section disciplinaire *"
            name="section"
            placeholder="ex : 61e section (Génie informatique, Automatique, Traitement du signal)"
            value={values.section}
            onChange={(e) => setValues({ ...values, section: e.target.value })}
          />
        </div>

        <div className="flex flex-col mb-3 mr-2">
          <label
            htmlFor="à propos"
            className="text-dynamic-lg font-main font-medium my-1"
          >
            A propos *
          </label>
          <RichTextEditor
            aria-labelledby="A propos"
            value={values.propos}
            onChange={(val) => setValues({ ...values, propos: val })}
          />
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="email"
              label="E-mail *"
              name="e-mail"
              placeholder="example@mail.com"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="tel"
              label="Téléphone *"
              name="telephone"
              placeholder="0712345678"
              value={values.telephone}
              onChange={(e) =>
                setValues({ ...values, telephone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="text"
              label="Lieu *"
              name="lieu"
              placeholder="ex : Bâtiment D - Salle D111"
              value={values.lieu}
              onChange={(e) => setValues({ ...values, lieu: e.target.value })}
            />
          </div>
        </div>

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

export default MembersManagementPage;

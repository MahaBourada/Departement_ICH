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
    nom: "",
    type: "",
    categorie: "",
    description: "",
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
      nom: "",
      type: "",
      categorie: "",
      description: "",
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
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
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
        </div>

        <p
          id="fonction-section-note"
          className="text-gray-800 dark:text-dark-white mt-4"
        >
          Le champ <strong>Catégorie</strong> est obligatoire uniquement si le
          type de la collaboration est <em>Nationale</em>.
        </p>

        <SelectField
          isRequired={values.type === "Nationale"}
          type="text"
          label="Catégorie *"
          name="categorie"
          placeholder="Sélectionnez une catégorie"
          value={values.categorie}
          onChange={(e) => setValues({ ...values, categorie: e.target.value })}
          values={[
            "Hôpital",
            "Université",
            "Partenaire socio-économique",
            "Autre",
          ]}
        />

        <TextAreaField
          isRequired={true}
          label="Description *"
          name="description"
          placeholder="Mini description de la collaboration"
          value={values.description}
          maxLength={500}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
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

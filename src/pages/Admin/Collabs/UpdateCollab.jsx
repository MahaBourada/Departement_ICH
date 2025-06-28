import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import { useParams } from "react-router-dom";
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
import { MessagePopup } from "../../../components/MsgPopup";

const UpdateCollab = () => {
  const { id } = useParams();

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [file, setFile] = useState();
  const [collab, setCollab] = useState({});
  const [values, setValues] = useState({
    nom: collab.nom,
    type: collab.type,
    categorie: collab.categorie,
    description: collab.description,
    logo: collab.logo,
  });

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`collaborations/${id}`);

      setCollab(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (collab?.idCollab) {
      const initialImage =
        collab.logo && !collab.logo.startsWith("data:image")
          ? `${import.meta.env.VITE_BASE_URL}/${collab.logo}`
          : collab.logo || null;

      setValues({
        nom: collab.nom || "",
        type: collab.type || "",
        categorie: collab.categorie || "",
        description: collab.description || "",
        logo: collab.logo || "",
      });
      setFile(initialImage);
    }
  }, [collab]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      logo: file,
    };

    try {
      const response = await api.put(
        `/collaborations/${collab.idCollab}`,
        data
      );

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setValues({
      nom: collab.nom,
      type: collab.type,
      categorie: collab.categorie,
      description: collab.description,
      logo: collab.logo,
    });
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">
        Gestion du membre {collab.nom}
      </h1>

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
              name="nom"
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

export default UpdateCollab;

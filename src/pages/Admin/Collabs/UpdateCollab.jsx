import React, { useContext, useEffect, useState } from "react";
import api from "../../../api/api";
import { useParams } from "react-router-dom";
import {
  ImageField,
  InputField,
  SelectField,
  TextAreaField,
} from "../../../components/Inputs";
import {
  BackButton,
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import { MessagePopup } from "../../../components/MsgPopup";
import { getRelativePath } from "../../../utils/getRelativePath";
import { UserContext } from "../../../contexts/UserContext";

const UpdateCollab = () => {
  const currentAdmin = useContext(UserContext).user;
  const { id } = useParams();

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [file, setFile] = useState();
  const [collab, setCollab] = useState({});
  const [values, setValues] = useState({
    nom: "",
    type: "",
    categorie: "",
    description_fr: "",
    description_en: "",
    logo: "",
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
        description_fr: collab.description_fr || "",
        description_en: collab.description_en || "",
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
      logo: getRelativePath(file),
      currentAdmin: currentAdmin,
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
      const backendMsg = error?.response?.data?.message;
      const backendErrors = error?.response?.data?.errors;

      setMsgStatus(0);

      if (backendErrors && backendErrors.length > 0) {
        // Show only the first error
        setMsg(backendErrors[0].msg);
      } else if (backendMsg) {
        setMsg(backendMsg);
      } else {
        setMsg("Une erreur est survenue.");
      }

      setMsgShow(true);
    }
  };

  const handleReset = () => {
    setValues({
      nom: collab.nom || "",
      type: collab.type || "",
      categorie: collab.categorie || "",
      description_fr: collab.description_fr || "",
      description_en: collab.description_en || "",
      logo: collab.logo || "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <BackButton />

      <h1 className="text-display leading-normal font-semibold">
        Gestion de la collaboration '{collab.nom}'
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col m-5"
      >
        <InputField
          isRequired={true}
          type="text"
          label="Nom de la collaboration *"
          name="nom"
          placeholder="Nom de la collaboration ou de l'organisation"
          value={values.nom}
          onChange={(e) => setValues({ ...values, nom: e.target.value })}
        />

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
              isRequired={true}
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
            className="underline p-0.5 transition-colors duration-300 hover:no-underline hover:bg-hover-main dark:hover:bg-dark-accent rounded-md"
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
          isRequired={values.description_fr}
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

          <SmallFilledButton type="submit" text="Modifier" />
        </div>
      </form>
    </main>
  );
};

export default UpdateCollab;

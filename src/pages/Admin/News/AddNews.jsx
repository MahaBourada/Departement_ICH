import React, { useState } from "react";
import { MessagePopup } from "../../../components/MsgPopup";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import {
  ImageField,
  InputField,
  TextAreaField,
} from "../../../components/Inputs";
import api from "../../../api/api";
import { dateFormatting } from "../../../utils/dateFormatting";

const AddNews = () => {
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);
  const [values, setValues] = useState({
    titre_fr: "",
    titre_en: "",
    contenu_fr: "",
    contenu_en: "",
    lien: "",
    image: null,
    alt_fr: "",
    alt_en: "",
  });

  const handleClose = () => {
    setMsgShow(false);
  };

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
    setValues((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      datePosted: dateFormatting(),
    };

    try {
      const response = await api.post("/news", data);

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
      titre_fr: "",
      titre_en: "",
      contenu_fr: "",
      contenu_en: "",
      lien: "",
      image: null,
      alt_fr: "",
      alt_en: "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">Ajouter une actualité</h1>

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
              label="Titre en français *"
              name="titre_fr"
              placeholder="Titre de l'actualité en français"
              value={values.titre_fr}
              onChange={(e) =>
                setValues({ ...values, titre_fr: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={true}
              type="text"
              label="Titre en anglais *"
              name="titre_en"
              placeholder="Titre de l'actualité en anglais"
              value={values.titre_en}
              onChange={(e) =>
                setValues({ ...values, titre_en: e.target.value })
              }
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
          isRequired={true}
          label="Texte en français *"
          name="contenu_fr"
          placeholder="Texte de l'actualité en français"
          value={values.contenu_fr}
          maxLength={700}
          onChange={(e) => setValues({ ...values, contenu_fr: e.target.value })}
        />

        <TextAreaField
          isRequired={true}
          label="Texte en anglais *"
          name="contenu_en"
          placeholder="Texte de l'actualité en anglais"
          value={values.contenu_en}
          maxLength={700}
          onChange={(e) => setValues({ ...values, contenu_en: e.target.value })}
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
          text="Image de l'actualité"
          name="image"
          alt="Image de l'actualité"
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

export default AddNews;

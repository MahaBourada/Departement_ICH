import React, { useContext, useEffect, useState } from "react";
import api from "../../../api/api";
import { Link, useParams } from "react-router-dom";
import {
  BackButton,
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import {
  ImageField,
  InputField,
  TextAreaField,
} from "../../../components/Inputs";
import { MessagePopup } from "../../../components/MsgPopup";
import { getRelativePath } from "../../../utils/getRelativePath";
import { UserContext } from "../../../contexts/UserContext.jsx";

const UpdateNews = () => {
  const currentAdmin = useContext(UserContext).user;
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [values, setValues] = useState({
    titre_fr: "",
    titre_en: "",
    contenu_fr: "",
    contenu_en: "",
    lien: "",
    image: null,
    source_image: "",
    alt_fr: "",
    alt_en: "",
  });

  const fetchData = async () => {
    try {
      const response = await api.get(`/news/${id}`);

      setNews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (news?.idActu) {
      setValues({
        titre_fr: news.titre_fr || "",
        titre_en: news.titre_en || "",
        contenu_fr: news.contenu_fr || "",
        contenu_en: news.contenu_en || "",
        lien: news.lien || "",
        image:
          news.image && !news.image.startsWith("data:image")
            ? `${import.meta.env.VITE_BASE_URL}/${news.image}`
            : news.image || null,
        source_image: news.source_image || "",
        alt_fr: news.alt_fr || "",
        alt_en: news.alt_en || "",
      });
    }
  }, [news]);

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
      image: null,
      source_image: "",
      alt_fr: "",
      alt_en: "",
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

    const data = {
      ...values,
      image: getRelativePath(values.image),
      currentAdmin: currentAdmin,
    };

    try {
      const response = await api.put(`/news/${news.idActu}`, data, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
        withCredentials: true,
      });

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
      titre_fr: news.titre_fr || "",
      titre_en: news.titre_en || "",
      contenu_fr: news.contenu_fr || "",
      contenu_en: news.contenu_en || "",
      lien: news.lien || "",
      image:
        news.image && !news.image.startsWith("data:image")
          ? `${import.meta.env.VITE_BASE_URL}/${news.image}`
          : news.image || null,
      source_image: news.source_image || "",
      alt_fr: news.alt_fr || "",
      alt_en: news.alt_en || "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <BackButton />

      <h1 className="text-display leading-normal font-semibold">
        Gestion de l'actualité '{news.titre_fr}'
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
          type="text"
          label="Source de l'image"
          name="source_image"
          placeholder="ex: Nom du photographe, URL..."
          value={values.source_image}
          onChange={(e) =>
            setValues({ ...values, source_image: e.target.value })
          }
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

          <SmallFilledButton type="submit" text="Modifier" />
        </div>
      </form>
    </main>
  );
};

export default UpdateNews;

import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import { InputField, TextAreaField } from "../../components/Inputs";
import { MessagePopup } from "../../components/MsgPopup";
import dayjs from "dayjs";
import { isValidPhoneNumber } from "libphonenumber-js";

const CollabForm = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    organisation: "",
    fonction: "",
    objet: "",
    description: "",
    site: "",
    fichier: null,
    debutDate: "",
    finDate: "",
  });
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      values.debutDate &&
      values.finDate &&
      values.debutDate > values.finDate
    ) {
      setMsg("La date de fin doit être après la date de début.");
      setMsgStatus(0);
      setMsgShow(true);
      return;
    }

    if (values.finDate && !values.debutDate) {
      setMsg(
        "Veuillez renseigner une date de début si vous spécifiez une date de fin."
      );
      setMsgStatus(0);
      setMsgShow(true);
      return;
    }

    if (!isValidPhoneNumber(values.telephone)) {
      setMsg("Numéro de téléphone invalide.");
      setMsgStatus(0);
      setMsgShow(true);
      return;
    }

    const disponibilites =
      values.debutDate && values.finDate
        ? `Du ${dayjs(values.debutDate).format("DD/MM/YYYY")} au ${dayjs(
            values.finDate
          ).format("DD/MM/YYYY")}`
        : values.debutDate
        ? `À partir du ${dayjs(values.debutDate).format("DD/MM/YYYY")}`
        : "";

    // Build FormData
    const formData = new FormData();

    // Append all fields except dates
    formData.append("prenom", values.prenom);
    formData.append("nom", values.nom);
    formData.append("email", values.email);
    formData.append("telephone", values.telephone);
    formData.append("organisation", values.organisation);
    formData.append("fonction", values.fonction);
    formData.append("objet", values.objet);
    formData.append("description", values.description);
    formData.append("site", values.site);
    formData.append("disponibilites", disponibilites);

    // Append file if it exists
    if (values.fichier) {
      formData.append("fichier", values.fichier);
    }

    try {
      setMsgStatus(1); // show loading
      setMsgShow(true);

      await api.post("/collab-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMsgStatus(200);
      setMsgShow(true);
      setMsg("Demande de collaboration envoyée");
    } catch (error) {
      console.error(error);

      setMsgStatus(0);
      setMsgShow(true);
      setMsg("Erreur lors de l'envoi");
    }
  };

  const handleReset = () => {
    setValues({
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      organisation: "",
      fonction: "",
      objet: "",
      description: "",
      site: "",
      fichier: null,
      debutDate: "",
      finDate: "",
    });
  };

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: "Collaborations",
          },
          {
            label: t("collaboration.form.title"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("collaboration.form.title")}
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form
        method="post"
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-3/4 m-auto"
      >
        <div className="flex flex-row items-start justify-between mb-3 max-md:flex-col">
          <div className="w-1/2 max-md:w-full mr-3">
            <InputField
              isRequired={true}
              type="text"
              label={`${t("collaboration.form.firstname")} *`}
              placeholder="John"
              name="prenom"
              value={values.prenom}
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="w-1/2 max-md:w-full">
            <InputField
              isRequired={true}
              type="text"
              label={`${t("collaboration.form.lastname")} *`}
              placeholder="DOE"
              name="nom"
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-row items-start justify-between mb-3 max-md:flex-col">
          <div className="w-1/2 max-md:w-full mr-3">
            <InputField
              isRequired={true}
              type="email"
              label="E-mail *"
              placeholder={`${t("collaboration.form.email_placeholder")}`}
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="w-1/2 max-md:w-full">
            <InputField
              isRequired={true}
              type="text"
              label={`${t("collaboration.form.phone")} *`}
              placeholder="+33 7 12 34 56 78"
              name="telephone"
              value={values.telephone}
              onChange={(e) =>
                setValues({ ...values, telephone: e.target.value })
              }
            />
          </div>
        </div>

        <InputField
          isRequired={true}
          type="text"
          label={`${t("collaboration.form.org.label")} *`}
          placeholder={t("collaboration.form.org.placeholder")}
          name="organisation"
          value={values.organisation}
          onChange={(e) =>
            setValues({ ...values, organisation: e.target.value })
          }
        />

        <InputField
          isRequired={true}
          type="text"
          label={`${t("collaboration.form.fonction.label")} *`}
          placeholder={t("collaboration.form.fonction.placeholder")}
          name="fonction"
          value={values.fonction}
          onChange={(e) => setValues({ ...values, fonction: e.target.value })}
        />

        <InputField
          isRequired={true}
          type="text"
          label={`${t("collaboration.form.subject.label")} *`}
          placeholder={t("collaboration.form.subject.placeholder")}
          name="objet"
          value={values.objet}
          onChange={(e) => setValues({ ...values, objet: e.target.value })}
        />

        <TextAreaField
          label={t("collaboration.form.desc.label")}
          placeholder={t("collaboration.form.desc.placeholder")}
          name="description"
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          maxLength={800}
        />

        <h2 className="text-dynamic-xl font-semibold mt-8">
          {t("collaboration.form.optional.label")}
        </h2>
        <InputField
          type="url"
          label={t("collaboration.form.optional.link")}
          placeholder="https://votre-site.com"
          name="site"
          value={values.site}
          onChange={(e) => setValues({ ...values, site: e.target.value })}
        />

        <div className="relative flex flex-col leading-normal my-4">
          <label htmlFor="fichier" className="font-main font-medium my-2">
            {t("collaboration.form.optional.file")}
          </label>
          <input
            type="file"
            accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .webp"
            name="fichier"
            id="fichier"
            className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
            onChange={(e) =>
              setValues({ ...values, fichier: e.target.files[0] })
            }
          />

          {values.fichier && (
            <p className="mt-4 text-dynamic-sm text-neutral-700 dark:text-neutral-300">
              <span className="font-semibold">
                {t("collaboration.form.optional.selected_file")} :{" "}
              </span>

              {values.fichier.name}
            </p>
          )}
        </div>

        <fieldset className="mt-8">
          <legend className="text-dynamic-xl font-semibold">
            {t("collaboration.form.availability.label")}
          </legend>
          <div className="flex flex-row items-start justify-between mb-3 max-md:flex-col">
            <div className="w-1/2 max-md:w-full mr-3">
              <InputField
                type="date"
                label={t("collaboration.form.availability.from")}
                placeholder="Ex. : Dès mi-juillet, avant septembre, etc."
                name="debutDate"
                value={values.debutDate}
                onChange={(e) =>
                  setValues({ ...values, debutDate: e.target.value })
                }
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <InputField
                type="date"
                label={t("collaboration.form.availability.to")}
                placeholder="Ex. : Dès mi-juillet, avant septembre, etc."
                name="finDate"
                value={values.finDate}
                onChange={(e) =>
                  setValues({ ...values, finDate: e.target.value })
                }
              />
            </div>
          </div>
        </fieldset>

        <div className="flex flex-row justify-end mt-4 max-md:flex-col-reverse max-md:items-end">
          <SmallBorderButton type="reset" text="Réinitialiser" />
          <SmallFilledButton type="submit" text="Envoyer" />
        </div>
      </form>
    </main>
  );
};

export default CollabForm;

import { X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MessagePopup from "../../components/MsgPopup";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import { InputField, TextAreaField } from "../../components/Inputs";

const ContactPage = () => {
  const { t } = useTranslation();
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setMsgShow(true);
    setMsgStatus(200);
    setMsg("Message envoyé");
  };

  return (
    <main className="flex-grow my-10 mb-20 mx-16 font-body max-sm:mx-7 max-md:mx-10">
      <h1 className="font-main font-semibold text-display readerMode:w-fit readerMode:mx-auto">
        Contact
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <div className="flex flex-row justify-between items-start max-large-medium:flex-col-reverse readerMode:flex-col readerMode:leading-loose readerMode:w-[60ch] max-large-medium:readerMode:w-full readerMode:mx-auto">
        <div className="flex flex-col ml-3 max-large-medium:mt-5 max-large-medium:mx-0">
          <h2 className="font-main font-medium text-header my-5">
            {t("contact.title")}
          </h2>
          <ul className="list-disc mx-8 leading-9">
            <li>Université Paris 8</li>
            <li>2, rue de la Liberté, 93526 Saint-Denis cedex</li>
            <li>Bâtiment D - salle 128</li>
          </ul>

          <img
            src="assets/vectors/Contact.svg"
            alt=""
            role="presentation"
            width={400}
            className="m-3 my-6 mx-auto minimal:hidden readerMode:hidden"
          />
        </div>

        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col w-[45%] readerMode:w-full max-large-medium:w-full mr-7"
        >
          <div className="flex flex-row items-start justify-between mb-3 max-md:flex-col">
            <div className="w-1/2 max-md:w-full mr-3">
              <InputField
                type="text"
                label={t("contact.form.firstname_label") + " *"}
                name="firstname"
                placeholder="Jane"
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <InputField
                type="text"
                label={t("contact.form.lastname_label") + " *"}
                name="lastname"
                placeholder="DOE"
              />
            </div>
          </div>

          <InputField
            type="email"
            label="E-mail *"
            name="email"
            placeholder={t("contact.form.mail_placeholder") + " *"}
          />

          <div className="flex flex-col my-3">
            <label
              htmlFor={t("contact.form.object.label")}
              className="font-main font-medium my-1"
            >
              {t("contact.form.object.label")} *
            </label>
            <select
              name={t("contact.form.object.label")}
              id={t("contact.form.object.label")}
              className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.95rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
            >
              <option value="">{t("contact.form.object.placeholder")}</option>
              <option value="feedback">{t("contact.form.object.1")}</option>
              <option value="reneseignements">
                {t("contact.form.object.2")}
              </option>
            </select>
          </div>

          <TextAreaField
            label="Message *"
            placeholder={t("contact.form.message_placeholder")}
            name="bodyMessage"
          />

          <div className="flex flex-row justify-end mt-4 max-md:flex-col-reverse max-md:items-end">
            <SmallBorderButton
              type="reset"
              bgColor="bg-white"
              color="text-black"
              borderColor="border-black"
              text={t("contact.form.reset")}
            />

            <SmallFilledButton
              type="submit"
              bgColor="bg-accent"
              color="text-black"
              text={t("contact.form.submit")}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;

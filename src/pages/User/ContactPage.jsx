import React from "react";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="flex-grow my-10 mb-20 mx-16 font-body">
      <h1 className="font-main font-semibold text-display">Contact</h1>
      <div className="flex justify-between items-start">
        <div className="flex flex-col ml-3">
          <h2 className="font-main font-medium text-header my-2">
            {t("contact.title")}
          </h2>
          <ul className="list-disc ml-8 leading-9">
            <li>Université Paris 8</li>
            <li>2, rue de la Liberté, 93526 Saint-Denis cedex</li>
            <li>Bâtiment D - salle 128</li>
          </ul>

          <img
            src="/assets/vectors/Contact.svg"
            alt=""
            width={560}
            className="m-3 my-6"
          />
        </div>

        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col w-[45%] mr-7"
        >
          <h2 className="font-main font-medium text-header my-2">
            {t("contact.form.title")}
          </h2>
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-col w-1/2 mr-3">
              <label
                htmlFor="prenom"
                className="text-nav font-main font-medium my-1"
              >
                {t("contact.form.firstname_label")} *
              </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                placeholder="Jane"
                className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label
                htmlFor="nom"
                className="text-nav font-main font-medium my-1"
              >
                {t("contact.form.lastname_label")} *
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                placeholder="DOE"
                className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              />
            </div>
          </div>

          <div className="flex flex-col my-3">
            <label
              htmlFor="email"
              className="text-nav font-main font-medium my-1"
            >
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("contact.form.mail_placeholder")}
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
            />
          </div>

          <div className="flex flex-col my-3">
            <label
              htmlFor="objet"
              className="text-nav font-main font-medium my-1"
            >
              {t("contact.form.object.label")} *
            </label>
            <select
              name="objet"
              id="objet"
              className="bg-white rounded-2xl px-5 py-[0.8rem] border-[1px] border-black mr-2 outline-none shadow-small"
            >
              <option value="">{t("contact.form.object.placeholder")}</option>
              <option value="feedback">{t("contact.form.object.1")}</option>
              <option value="reneseignements">
                {t("contact.form.object.2")}
              </option>
            </select>
          </div>

          <div className="flex flex-col my-3">
            <label
              htmlFor="message"
              className="text-nav font-main font-medium my-1"
            >
              Message *
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder={t("contact.form.message_placeholder")}
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-3 outline-none shadow-small"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="reset"
              className="cursor-pointer bg-white border-2 border-black font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
            >
              {t("contact.form.reset")}
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 mx-3 shadow-small hover:translate-[1px] hover:shadow-none"
            >
              {t("contact.form.submit")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;

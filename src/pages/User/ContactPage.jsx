import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessagePopup } from "../../components/MsgPopup";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "../../components/Inputs";
import api from "../../api/api";

const ContactPage = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    bodyMessage: "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsgStatus(1);
    setMsgShow(true);

    try {
      await api.post("/contact", values);

      setMsgStatus(200);
      setMsgShow(true);
      setMsg("Message envoyé");
    } catch (error) {
      console.error(error);

      setMsgStatus(0);
      setMsgShow(true);
      setMsg("Erreur lors de l'envoi");
    }
  };

  const handleReset = () => {
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      bodyMessage: "",
    });
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
          <ul className="list-disc mx-8">
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
          id="contactForm"
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col w-[45%] readerMode:w-full max-large-medium:w-full mr-7"
          method="POST"
        >
          <div className="flex flex-row items-start justify-between mb-3 max-md:flex-col">
            <div className="w-1/2 max-md:w-full mr-3">
              <InputField
                isRequired={true}
                type="text"
                label={t("contact.form.firstname_label") + " *"}
                name="firstname"
                placeholder="Jane"
                value={values.firstName}
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <InputField
                isRequired={true}
                type="text"
                label={t("contact.form.lastname_label") + " *"}
                name="lastname"
                placeholder="DOE"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <InputField
            isRequired={true}
            type="email"
            label="E-mail *"
            name="email"
            placeholder={t("contact.form.mail_placeholder") + " *"}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <SelectField
            isRequired={true}
            label={t("contact.form.subject.label") + " *"}
            placeholder={t("contact.form.subject.placeholder")}
            name="subject"
            value={values.subject}
            onChange={(e) => setValues({ ...values, subject: e.target.value })}
            values={[t("contact.form.subject.1"), t("contact.form.subject.2")]}
          />

          <TextAreaField
            isRequired={true}
            label="Message *"
            placeholder={t("contact.form.message_placeholder")}
            name="bodyMessage"
            value={values.bodyMessage}
            onChange={(e) =>
              setValues({ ...values, bodyMessage: e.target.value })
            }
          />

          <div className="flex flex-row justify-end mt-4 max-md:flex-col-reverse max-md:items-end">
            <SmallBorderButton
              type="reset"
              text={t("contact.form.reset")}
              onClick={handleReset}
            />

            <SmallFilledButton type="submit" text={t("contact.form.submit")} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;

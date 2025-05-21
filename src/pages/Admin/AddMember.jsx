import React, { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";

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
      <h1 className="text-display font-semibold">Ajouter un membre</h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <label
              htmlFor="prenom"
              className="text-nav font-main font-medium my-1"
            >
              Prénom *
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Jane"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <label
              htmlFor="titre"
              className="text-nav font-main font-medium my-1"
            >
              Nom *
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="DOE"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col mb-3 w-[49%]">
            <label
              htmlFor="image"
              className="text-nav font-main font-medium my-1"
            >
              Image *
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
            />
          </div>
          {file && (
            <img
              src={file}
              alt={"Image du membre"}
              className="w-1/4 m-auto p-5"
            />
          )}
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <label
              htmlFor="titre"
              className="text-nav font-main font-medium my-1"
            >
              Titre *
            </label>
            <select
              name="titre"
              id="titre"
              className="bg-white rounded-2xl px-5 py-[0.8rem] border-[1px] border-black outline-none shadow-small mr-2"
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
            <label
              htmlFor="fonction"
              className="text-nav font-main font-medium my-1"
            >
              Fonction *
            </label>
            <input
              type="text"
              name="fonction"
              id="fonction"
              placeholder="ex : Maître de conférences"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, fonction: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label
            htmlFor="section"
            className="text-nav font-main font-medium my-1"
          >
            Section disciplinaire *
          </label>
          <input
            type="text"
            name="section"
            id="section"
            placeholder="ex : Génie informatique, Automatique, Traitement du signal"
            className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
            onChange={(e) => setValues({ ...values, section: e.target.value })}
          />
        </div>

        <div className="flex flex-col mb-3 mr-2">
          <label
            htmlFor="à propos"
            className="text-nav font-main font-medium my-1"
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
            <label
              htmlFor="e-mail"
              className="text-nav font-main font-medium my-1"
            >
              E-mail *
            </label>
            <input
              type="email"
              name="e-mail"
              id="e-mail"
              placeholder="exemple@mail.com"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-3">
            <label
              htmlFor="telephone"
              className="text-nav font-main font-medium my-1"
            >
              Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              placeholder="0712345678"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, telephone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-1/2 mr-3">
            <label
              htmlFor="lieu"
              className="text-nav font-main font-medium my-1"
            >
              Lieu *
            </label>
            <textarea
              name="lieu"
              id="lieu"
              rows="1"
              placeholder="ex : Bâtiment D - Salle D111"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-3 outline-none shadow-small"
              onChange={(e) => setValues({ ...values, lieu: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="reset"
            className="cursor-pointer bg-white border-1 border-black font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 mx-3 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Ajouter
          </button>
        </div>
      </form>
    </main>
  );
};

export default MembersManagementPage;

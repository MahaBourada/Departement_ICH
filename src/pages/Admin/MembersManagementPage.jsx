import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import { Trash2 } from "lucide-react";
import MessagePopup from "../../components/MsgPopup";
import { ImageField, InputField, TextAreaField } from "../../components/Inputs";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";

const MembersManagementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/members/${id}`);
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const defaultContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  useEffect(() => {
    if (member?.idMembre) {
      const initialImage =
        member.image_blob && !member.image_blob.startsWith("data:image")
          ? `${import.meta.env.VITE_BASE_URL}/${member.image_blob}`
          : member.image_blob || null;

      setValues({
        prenom: member.prenom || "",
        nom: member.nom || "",
        titre: member.titre || "",
        fonction: member.fonction || "",
        section: member.section || "",
        propos:
          typeof member?.propos === "string" && member.propos.trim() !== ""
            ? JSON.parse(member.propos)
            : defaultContent,
        email: member.email || "",
        telephone: member.telephone || "",
        lieu: member.lieu || "",
        image_blob: member.image_blob || "",
      });
      setFile(initialImage);
    }
  }, [member]);

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

  const [values, setValues] = useState({
    prenom: member?.prenom || "",
    nom: member?.nom || "",
    titre: member?.titre || "",
    fonction: member?.fonction || "",
    section: member?.section || "",
    propos:
      typeof member?.propos === "string" && member.propos.trim() !== ""
        ? JSON.parse(member.propos)
        : defaultContent,
    email: member?.email || "",
    telephone: member?.telephone || "",
    lieu: member?.lieu || "",
    image_blob: file || "",
  });

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
      propos: JSON.stringify(values.propos || defaultContent),
    };

    try {
      const response = await api.put(`/members/${member.idMembre}`, data);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (idMembre) => {
    try {
      const response = await api.delete(`/members/${idMembre}`);
      setTimeout(() => {
        navigate("/admin/gestion-equipe");
      }, 300);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="text-display font-semibold ">
          Gestion du membre {member.prenom + " " + member.nom}
        </h1>

        {msgShow && (
          <MessagePopup
            message={msg}
            onClose={handleClose}
            status={msgStatus}
          />
        )}

        <button
          type="button"
          onClick={() => handleDelete(member.idMembre)}
          className="hover:translate-[1px] cursor-pointer mx-7"
        >
          <Trash2
            aria-label="Ajouter un membre"
            size={36}
            color="#8E0000"
            strokeWidth={2.25}
          />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              type="text"
              label="Prénom *"
              name="prenom"
              placeholder="Jane"
              value={values.prenom}
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              type="text"
              label="Nom *"
              name="nom"
              placeholder="DOE"
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
        </div>

        <ImageField
          text="Image *"
          name="imageMembre"
          alt={`Image de ${member.prenom + " " + member.nom}`}
          file={file}
          onChange={handleChange}
        />

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
              className="bg-gray-100 border-gray-300 border-2 rounded-xl px-5 py-[0.95rem] mr-2 outline-gray-500"
              value={values.titre}
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
            <InputField
              type="text"
              label="Fonction *"
              name="fonction"
              placeholder="ex : Maître de conférences"
              value={values.fonction}
              onChange={(e) =>
                setValues({ ...values, fonction: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <InputField
            type="text"
            label="Section disciplinaire *"
            name="section"
            placeholder="ex : 61e section (Génie informatique, Automatique, Traitement du signal)"
            value={values.section}
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
            <InputField
              type="email"
              label="E-mail *"
              name="e-mail"
              placeholder="example@mail.com"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="tel"
              label="Téléphone *"
              name="telephone"
              placeholder="0712345678"
              value={values.telephone}
              onChange={(e) =>
                setValues({ ...values, telephone: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="text"
              label="Lieu *"
              name="lieu"
              placeholder="ex : Bâtiment D - Salle D111"
              value={values.lieu}
              onChange={(e) => setValues({ ...values, lieu: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <SmallBorderButton
            type="reset"
            bgColor="bg-white"
            color="text-black"
            borderColor="border-black"
            text="Réinitialiser"
          />

          <SmallFilledButton
            type="submit"
            bgColor="bg-accent"
            color="text-black"
            text="Modifier"
          />
        </div>
      </form>
    </main>
  );
};

export default MembersManagementPage;

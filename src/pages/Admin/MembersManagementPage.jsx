import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";
import { Trash } from "lucide-react";

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
        image_blob: member.image_blob || null,
      });
      setFile(initialImage);
    }
  }, [member]);

  const [file, setFile] = useState();

  console.log(file);

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
    image_blob: file || null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      propos: JSON.stringify(values.propos || defaultContent),
    };

    try {
      await api.put(`/members/${member.idMembre}`, data);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (idMembre) => {
    try {
      await api.delete(`/members/${idMembre}`);
      setTimeout(() => {
        navigate("/admin/gestion-equipe");
      }, 300);
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

        <button
          type="button"
          onClick={() => handleDelete(member.idMembre)}
          className="hover:translate-[1px] cursor-pointer mx-7"
        >
          <Trash
            aria-label="Ajouter un membre"
            size={36}
            color="#8E0000"
            strokeWidth={2.8}
          />
        </button>
      </div>

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
              value={values.prenom}
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <label
              htmlFor="nom"
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
              value={values.nom}
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
              alt={`Image de ${member.prenom + " " + member.nom}`}
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
              className="bg-white rounded-2xl px-5 py-[0.8rem] border-[1px] border-black outline-none shadow-small"
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
              value={values.fonction}
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
              value={values.email}
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
              value={values.telephone}
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
              value={values.lieu}
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
            Modifier
          </button>
        </div>
      </form>
    </main>
  );
};

export default MembersManagementPage;

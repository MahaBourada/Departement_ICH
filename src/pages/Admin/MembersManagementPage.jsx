import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../api/api";

const MembersManagementPage = () => {
  const location = useLocation();
  const { member } = location.state || {};

  const [values, setValues] = useState({
    prenom: member?.prenom || "",
    nom: member?.nom || "",
    titre: member?.titre || "",
    fonction: member?.fonction || "",
    section: member?.section || "",
    propos: JSON.parse(member?.propos) || "",
    email: member?.email || "",
    telephone: member?.telephone || "",
    lieu: member?.lieu || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      propos: JSON.stringify(values.propos),
    };
    
    try {
      await api.put(`/members/${member.idMembre}`, data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-14 mt-20">
      <h1 className="text-display font-semibold">
        Gestion du membre {member.prenom + " " + member.nom}
      </h1>

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
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
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
              <option value="Enseignant">Enseignant</option>
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

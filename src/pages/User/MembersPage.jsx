import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/api";

const MembersPage = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {t("department.team.title")}
      </h1>

      <h2 className="font-medium text-header font-main mx-2">
        Directeur du département
      </h2>

      <div className="grid grid-cols-2 mb-6">
        {members
          .filter((member) => member.titre === "Directeur du département")
          .map((member) => {
            const match = member.section?.match(/^(.+?)\s*\((.+)\)$/);

            const mainPart = match ? match[1].trim() : "";
            const subParts = match
              ? match[2].split(",").map((s) => s.trim())
              : [];
            return (
              <Link
                key={member.idMembre}
                to={member.idMembre}
                state={{ member: member }}
                className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
              >
                <h3 className="font-main font-medium text-header">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex items-start">
                  <img
                    src="src/assets/images/Anis.png"
                    alt="Photo de Anis ROJBI"
                    width={200}
                    className="rounded-3xl"
                  />

                  <div className="ml-4 my-2">
                    <h4 className="font-semibold text-2xl my-2">
                      {member.fonction}
                    </h4>
                    <p className="mx-2">{mainPart}</p>
                    <ul className="list-disc mx-9 leading-9">
                      {subParts.map((item, index) => (
                        <li key={index}>
                          {item.charAt(0).toLowerCase() + item.slice(1)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <h2 className="font-medium text-header font-main mx-2">Administration</h2>

      <div className="grid grid-cols-2 mb-6">
        <Link
          to="rui-rosa"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Rui ROSA</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Rui.png"
              alt="Photo de Rui ROSA"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">Secrétaire</h4>
            </div>
          </div>
        </Link>

        <Link
          to="subha-peroumal"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Subha PEROUMAL</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Subha.png"
              alt="Photo de Subha PEROUMAL"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">Technicienne</h4>
            </div>
          </div>
        </Link>
        {members
          .filter((member) => member.titre === "Administration")
          .map((member) => (
            <Link
              key={member.idMembre}
              to={member.idMembre}
              state={{ member: member }}
              className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
            >
              <h3 className="font-main font-medium text-header">
                {member.prenom + " " + member.nom.toUpperCase()}
              </h3>
              <div className="flex items-start">
                <img
                  src="src/assets/images/Anis.png"
                  alt="Photo de Anis ROJBI"
                  width={200}
                  className="rounded-3xl"
                />

                <div className="ml-4 my-2">
                  <h4 className="font-semibold text-2xl my-2">
                    {member.fonction}
                  </h4>
                  <p className="mx-2">{member.section}</p>
                  <ul className="list-disc mx-7 leading-9">
                    <li>{member.section}</li>
                    <li>{member.section}</li>
                    <li>{member.section}</li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <h2 className="font-medium text-header font-main mx-2">Enseignants</h2>

      <div className="grid grid-cols-2">
        {members
          .filter((member) => member.titre === "Enseignant")
          .map((member) => (
            <Link
              key={member.idMembre}
              to={member.idMembre}
              state={{ member: member }}
              className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
            >
              <h3 className="font-main font-medium text-header">
                {member.prenom + " " + member.nom.toUpperCase()}
              </h3>
              <div className="flex items-start">
                <img
                  src="src/assets/images/Anis.png"
                  alt="Photo de Anis ROJBI"
                  width={200}
                  className="rounded-3xl"
                />

                <div className="ml-4 my-2">
                  <h4 className="font-semibold text-2xl my-2">
                    {member.fonction}
                  </h4>
                  <p className="mx-2">{member.section}</p>
                  <ul className="list-disc mx-7 leading-9">
                    <li>{member.section}</li>
                    <li>{member.section}</li>
                    <li>{member.section}</li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        <Link
          to="dominique-archaumbault"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">
            Dominique ARCHAMBAULT
          </h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Dominique.png"
              alt="Photo de Dominique ARCHAMBAULT"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">
                Professeur des Universités
              </h4>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="salvatore-anzalone"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">
            Salvatore ANZALONE
          </h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Salvatore.png"
              alt="Photo de Salvatore ANZALONE"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">
                Maître de conférences
              </h4>
              <p className="mx-2">61e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Génie informatique</li>
                <li>Automatique</li>
                <li>Traitement du signal</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="johana-bodard"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Johana BODARD</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Johana.png"
              alt="Photo de Johana BODARD"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">A fournir</h4>
            </div>
          </div>
        </Link>

        <Link
          to="celine-jost"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Céline JOST</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Celine.png"
              alt="Photo de Céline JOST"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">
                Maître de conférences
              </h4>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="isis-truck"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Isis TRUCK</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Isis.png"
              alt="Photo de Isis TRUCK"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">
                Professeur des Universités
              </h4>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="gerard-uzan"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Gérard UZAN</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Gerard.png"
              alt="Photo de Gérard UZAN"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <h4 className="font-semibold text-2xl my-2">A fournir</h4>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default MembersPage;

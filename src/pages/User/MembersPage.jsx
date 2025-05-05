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
                    {member.section && (
                      <>
                        <p className="mx-2">{mainPart}</p>
                        <ul className="list-disc mx-9 leading-9">
                          {subParts.map((item, index) => (
                            <li key={index}>
                              {item.charAt(0).toLowerCase() + item.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <h2 className="font-medium text-header font-main mx-2">Administration</h2>

      <div className="grid grid-cols-2 mb-6">
        {members
          .filter((member) => member.titre === "Administration")
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
                    {member.section && (
                      <>
                        <p className="mx-2">{mainPart}</p>
                        <ul className="list-disc mx-9 leading-9">
                          {subParts.map((item, index) => (
                            <li key={index}>
                              {item.charAt(0).toLowerCase() + item.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <h2 className="font-medium text-header font-main mx-2">Enseignants</h2>

      <div className="grid grid-cols-2">
        {members
          .filter((member) => member.titre === "Enseignant(e)")
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
                    {member.section && (
                      <>
                        <p className="mx-2">{mainPart}</p>
                        <ul className="list-disc mx-9 leading-9">
                          {subParts.map((item, index) => (
                            <li key={index}>
                              {item.charAt(0).toLowerCase() + item.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

export default MembersPage;

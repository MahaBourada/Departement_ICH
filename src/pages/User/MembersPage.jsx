import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/api";
import { ChevronRight } from "lucide-react";

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

  console.log(members);

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="my-1 mb-5 p-1.5 w-fit rounded-xl flex items-center font-medium max-large-medium:hidden"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.team.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {t("department.team.title")}
      </h1>

      <h2 className="font-medium text-header font-main mx-2">
        Directeur du département
      </h2>

      <div className="grid grid-cols-2 mb-6 max-md:grid-cols-1">
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
                className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] hover:shadow-none w-full shadow-small"
              >
                <h3 className="font-main font-medium text-header max-md:text-3xl">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex items-start">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      member.image_blob
                    }`}
                    alt="Photo de Anis ROJBI"
                    width={200}
                    className="rounded-3xl minimal:hidden max-lg:hidden max-xl:w-40"
                  />

                  <div className="ml-4 my-2 max-md:mx-1">
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

      <div className="grid grid-cols-2 mb-6 max-md:grid-cols-1">
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
                className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] hover:shadow-none shadow-small"
              >
                <h3 className="font-main font-medium text-header max-md:text-3xl">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex items-start">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      member.image_blob
                    }`}
                    alt="Photo de Anis ROJBI"
                    width={200}
                    className="rounded-3xl minimal:hidden max-lg:hidden max-xl:w-40"
                  />

                  <div className="ml-4 my-2 max-md:mx-1">
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

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-y-10">
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
                state={{ member }}
                className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] hover:shadow-none shadow-small h-full flex flex-col justify-between"
              >
                {/* Title */}
                <h3 className="font-main font-medium text-header max-md:text-3xl mb-4">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>

                {/* Content section */}
                <div className="flex-grow flex flex-col justify-between h-full">
                  {/* Text + image */}
                  <div className="flex justify-between h-full gap-4">
                    {/* Image (stick to bottom visually) */}
                    <div className="flex flex-col justify-end">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${
                          member.image_blob
                        }`}
                        alt={`Photo de ${member.nom}`}
                        width={200}
                        className="rounded-3xl minimal:hidden max-lg:hidden max-xl:w-40"
                      />
                    </div>
                    {/* Textual info */}
                    <div className="flex flex-col justify-start flex-grow">
                      <h4 className="font-semibold text-2xl mb-2">
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
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

export default MembersPage;

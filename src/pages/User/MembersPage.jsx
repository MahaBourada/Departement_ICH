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

  const darkTheme = localStorage.getItem("theme");

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="mb-10 my-1 p-1.5 py-1 w-full bg-gray-200 rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-black"
      >
        <Link to="/" className="px-4 py-1 rounded-xl">
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-dark-accent dark:text-black bg-bg-transparent">
          {t("department.link")}
        </span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">
          {t("department.team.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {t("department.team.title")}
      </h1>

      <h2 className="font-medium text-dynamic-xl font-main mx-2 mt-7 mb-4 readerMode:w-fit readerMode:mx-auto">
        Directeur du département
      </h2>

      <div className="grid grid-cols-2 mb-6 max-md:grid-cols-1 readerMode:grid-cols-1 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
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
                className="border-2 border-black dark:border-gray-300 rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] max-lg:flex max-lg:flex-col max-lg:justify-start"
              >
                <h3 className="font-main font-medium text-dynamic-xl max-md:text-3xl">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex flex-row items-start max-lg:flex-col-reverse max-lg:justify-between max-lg:h-full">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      member.image_blob
                    }`}
                    alt={`Photo de ${member.nom}`}
                    width={200}
                    className="rounded-3xl minimal:hidden max-lg:mx-auto max-lg:w-fit max-xl:w-40"
                  />

                  <div className="ml-4 my-2 max-md:mx-1">
                    <h4 className="font-semibold text-dynamic-lg my-2">
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

      <h2 className="font-medium text-dynamic-xl font-main mx-2 mt-7 mb-4 readerMode:w-fit readerMode:mx-auto">
        Administration
      </h2>

      <div className="grid grid-cols-2 mb-6 max-md:grid-cols-1 readerMode:grid-cols-1 readerMode:leading-loose readerMode:text-2xl readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full max-large-medium:readerMode:text-xl">
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
                className="border-2 border-black dark:border-gray-300 rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] max-lg:flex max-lg:flex-col max-lg:justify-start"
              >
                <h3 className="font-main font-medium text-dynamic-xl max-md:text-3xl">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex flex-row items-start max-lg:flex-col-reverse max-lg:justify-between max-lg:h-full">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      member.image_blob
                    }`}
                    alt={`Photo de ${member.nom}`}
                    width={200}
                    className="rounded-3xl minimal:hidden max-lg:mx-auto max-lg:w-fit max-xl:w-40"
                  />

                  <div className="ml-4 my-2 max-md:mx-1">
                    <h4 className="font-semibold text-dynamic-lg my-2">
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

      <h2 className="font-medium text-dynamic-xl font-main mx-2 mt-7 mb-4 readerMode:w-fit readerMode:mx-auto">
        Enseignants
      </h2>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-y-10 readerMode:grid-cols-1 readerMode:leading-loose readerMode:text-2xl readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full max-large-medium:readerMode:text-xl">
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
                className="border-2 border-black dark:border-gray-300 rounded-[50px] px-6 py-6 m-4 mx-5 max-md:mx-auto max-md:w-full hover:translate-[1px] max-lg:flex max-lg:flex-col max-lg:justify-start"
              >
                <h3 className="font-main font-medium text-dynamic-xl max-md:text-3xl">
                  {member.prenom + " " + member.nom.toUpperCase()}
                </h3>
                <div className="flex flex-row items-start max-lg:flex-col-reverse max-lg:justify-between max-lg:h-full">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      member.image_blob
                    }`}
                    alt={`Photo de ${member.nom}`}
                    width={200}
                    className="rounded-3xl minimal:hidden max-lg:mx-auto max-lg:w-fit max-xl:w-40"
                  />

                  <div className="ml-4 my-2 max-md:mx-1">
                    <h4 className="font-semibold text-dynamic-lg my-2">
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

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";

const IndividualPage = () => {
  const { t } = useTranslation();
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

  const UpperNom = member.nom?.toUpperCase() || "";

  const match = member.section?.match(/^(.+?)\s*\((.+)\)$/);

  const mainPart = match ? match[1].trim() : "";
  const subParts = match ? match[2].split(",").map((s) => s.trim()) : [];

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: t("home.link"),
          },
          {
            label: t("department.link"),
          },
          {
            link: "/departement/equipe",
            label: t("department.team.title"),
          },
          {
            label: member.prenom + " " + UpperNom,
          },
        ]}
      />

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 mb-4 readerMode:w-fit readerMode:mx-auto">
        {member.prenom + " " + UpperNom}
      </h1>

      <div className="flex flex-row items-start justify-between readerMode:flex-col readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="m-2">
          <h2 className="font-medium text-dynamic-xl font-main">
            {member.titre}
          </h2>
          <h3 className="font-semibold text-dynamic-lg m-2">
            {member.fonction}
          </h3>
          <p className="mx-2">{mainPart}</p>
          <ul className="list-disc mx-9">
            {subParts.map((item, index) => (
              <li key={index}>
                {item.charAt(0).toLowerCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          {member.propos && (
            <>
              <h2 className="font-medium text-dynamic-xl font-main mt-4">
                A propos
              </h2>
              <ReactMarkdown
                className="my-2 markdown"
                children={String(member.propos)}
              />
            </>
          )}
        </div>

        <img
          src={`${import.meta.env.VITE_BASE_URL}/${member.image}`}
          alt={`Photo de ${member.prenom} ${UpperNom}`}
          width={350}
          className="rounded-3xl m-4 mx-10 readerMode:mx-auto"
        />
      </div>
    </main>
  );
};

export default IndividualPage;

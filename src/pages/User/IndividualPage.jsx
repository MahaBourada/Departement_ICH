import { House } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { BackButton } from "../../components/Buttons";

const IndividualPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [member, setMember] = useState({});
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/members/content/${id}?lang=${lang}`);
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const UpperNom = member.nom?.toUpperCase() || "";

  const [mainPartRaw, subPartRaw] = (member.section || "").split(":");
  const mainPart = mainPartRaw?.trim() || "";
  const subParts = subPartRaw ? subPartRaw.split(",").map((s) => s.trim()) : [];

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <Breadcrumb
        crumbs={[
          {
            link: "/",
            label: (
              <span className="flex flex-row items-center gap-x-2">
                <House size={26} strokeWidth={2.2} />
                {t("home.link")}
              </span>
            ),
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

      <BackButton />

      <h1 className="font-main dyslexiaTheme:font-dyslexia font-semibold text-dynamic-2xl text-dynamic-xl leading-snug my-2 mb-4 max-sm:my-2 readerMode:w-fit readerMode:mx-auto">
        {member.prenom + " " + UpperNom}
      </h1>

      <div className="flex flex-row max-sm:flex-col items-start justify-between readerMode:flex-col readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="m-2 max-sm:mx-0">
          <h2 className="font-medium text-dynamic-xl leading-snug text-dynamic-lg max-sm:font-semibold font-main dyslexiaTheme:font-dyslexia">
            {t(`department.team.categories.${member.titre}`)}
          </h2>
          <h3 className="font-semibold text-dynamic-lg leading-snug text-dynamic-lg m-2 max-sm:mx-0">
            {member.fonction}
          </h3>
          <p className="mx-2">{mainPart}</p>
          <ul className="list-disc mx-9">
            {subParts.map((item, index) => (
              <li key={index}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          {member.propos && (
            <>
              <h2 className="font-medium text-dynamic-xl font-main dyslexiaTheme:font-dyslexia mt-4">
                A propos
              </h2>
              <ReactMarkdown
                className="m-2 markdown"
                children={String(member.propos)}
              />
            </>
          )}
        </div>

        {member.image && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${member.image}`}
            alt={`Photo de ${member.prenom} ${UpperNom}`}
            width={350}
            className="dark:bg-neutral-500 rounded-3xl m-4 mx-10 max-sm:mx-0 readerMode:mx-auto"
          />
        )}
      </div>
    </main>
  );
};

export default IndividualPage;

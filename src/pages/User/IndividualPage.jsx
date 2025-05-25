import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serializeSingleToHtml } from "../../utils/slateToHtml";
import api from "../../api/api";
import { useTranslation } from "react-i18next";

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

  console.log(serializeSingleToHtml(member.propos));

  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <nav
        aria-label="breadcrumb"
        className="my-1 mb-7 mx-2 p-1.5 w-fit rounded-xl flex items-center font-medium"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <Link
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent underline hover:translate-[1px]"
          to="/equipe"
        >
          {t("department.team.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent underline hover:translate-[1px]">
          {member.prenom + " " + UpperNom}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 mb-4">
        {member.prenom + " " + UpperNom}
      </h1>

      <div className="flex items-start justify-between">
        <div className="m-2">
          <h2 className="font-medium text-dynamic-xl font-main">{member.titre}</h2>
          <h3 className="font-semibold text-dynamic-lg m-2">{member.fonction}</h3>
          <p className="mx-2">{mainPart}</p>
          <ul className="list-disc mx-9 leading-9">
            {subParts.map((item, index) => (
              <li key={index}>
                {item.charAt(0).toLowerCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          {serializeSingleToHtml(member.propos) !== "<p ></p>" && (
            <>
              <h2 className="font-medium text-dynamic-xl font-main mt-4">
                A propos
              </h2>
              <div
                className="my-2"
                dangerouslySetInnerHTML={{
                  __html: serializeSingleToHtml(member.propos),
                }}
              ></div>
            </>
          )}

          <h2 className="font-medium text-dynamic-xl font-main mt-4">Contact</h2>

          {member.lieu && (
            <div className="flex items-center my-2">
              <MapPin size={32} color="#232323" />
              <p className="mx-2">{member.lieu}</p>
            </div>
          )}

          {member.email && (
            <div className="flex items-center my-4">
              <Mail size={32} color="#232323" />
              <p className="mx-2">{member.email}</p>
            </div>
          )}

          {member.telephone && (
            <div className="flex items-center my-4">
              <Phone size={32} color="#232323" />
              <p className="mx-2">{member.telephone}</p>
            </div>
          )}
        </div>

        <img
          src={`${import.meta.env.VITE_BASE_URL}/${member.image_blob}`}
          alt="Photo de Anis ROJBI"
          width={350}
          className="rounded-3xl m-4 mx-10"
        />
      </div>
    </main>
  );
};

export default IndividualPage;

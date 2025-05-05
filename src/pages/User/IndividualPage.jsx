import { Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { serializeSingleToHtml } from "../../utils/slateToHtml";
import api from "../../api/api";

const IndividualPage = () => {
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
      <h1 className="font-main font-semibold text-display my-2 mb-4">
        {member.prenom + " " + UpperNom}
      </h1>

      <div className="flex items-start justify-between">
        <div className="m-2">
          <h2 className="font-medium text-header font-main">{member.titre}</h2>
          <h3 className="font-semibold text-2xl m-2">{member.fonction}</h3>
          <p className="mx-2">{mainPart}</p>
          <ul className="list-disc mx-9 leading-9">
            {subParts.map((item, index) => (
              <li key={index}>
                {item.charAt(0).toLowerCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          <h2 className="font-medium text-header font-main mt-4">A propos</h2>
          <div
            className="my-2"
            dangerouslySetInnerHTML={{
              __html: serializeSingleToHtml(member.propos),
            }}
          ></div>

          <h2 className="font-medium text-header font-main mt-4">Contact</h2>

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
          src="/src/assets/images/Anis.png"
          alt="Photo de Anis ROJBI"
          width={350}
          className="rounded-3xl m-4 mx-10"
        />
      </div>
    </main>
  );
};

export default IndividualPage;

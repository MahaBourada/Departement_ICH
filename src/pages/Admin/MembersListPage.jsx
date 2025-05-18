import { ExternalLink, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const MembersListPage = () => {
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
    <main className="mx-14 my-20">
      <div className="flex items-center justify-between text-display font-semibold">
        <h1 className="text-display font-semibold ">
          Gestion de l'équipe du département
        </h1>

        <Link
          to="/admin/gestion-equipe/ajouter-membre"
          className="hover:translate-[1px] cursor-pointer mx-4"
        >
          <Plus
            aria-label="Ajouter un membre"
            size={36}
            color="#232323"
            strokeWidth={2.8}
          />
        </Link>
      </div>

      {members.length === 0 && (
        <div className="m-auto w-fit mt-20 text-3xl font-medium">
          <h2>Aucun membre enregistré</h2>
        </div>
      )}

      <div className="grid grid-cols-2 my-4 max-large-medium:grid-cols-1">
        {members.length > 0 &&
          members.map((member, index) => (
            <Link
              onClick={() => window.scrollTo({ top: 0 })}
              key={index}
              to={`/admin/gestion-equipe/${member.idMembre}`}
              state={{ nom: member.nom, link: member.link, member: member }}
              className="mx-4 my-2 hover:translate-[1px] hover:underline"
            >
              <div className=" flex justify-between items-center font-main font-medium bg-admin-nav-bg p-6 rounded-3xl">
                <p>{member.prenom + " " + member.nom.toUpperCase()}</p>
                <ExternalLink size={26} color="#232323" />
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};

export default MembersListPage;

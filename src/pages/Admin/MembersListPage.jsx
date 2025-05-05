import { ExternalLink, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const MembersListPage = () => {
  const members_names = [
    { nom: "Anis ROJBI", link: "anis-rojbi" },
    { nom: "Rui ROSA", link: "rui-rosa" },
    { nom: "Subha PEROUMAL", link: "subha-peroumal" },
    { nom: "Dominique ARCHAMBAULT", link: "dominique-archambault" },
    { nom: "Salvatore ANZALONE", link: "salvatore-anzalone" },
    { nom: "Johana BODARD", link: "johana-bodard" },
    { nom: "Céline JOST", link: "celine-jost" },
    { nom: "Isis TRUCk", link: "isis-truck" },
    { nom: "Gérard UZAN", link: "gerard-uzan" },
  ];

  return (
    <main className="mx-14 mt-20">
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

      <div className="grid grid-cols-2 my-4">
        {members_names.map((member, index) => (
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            key={index}
            to={`/admin/gestion-equipe/${member.link}`}
            state={{ nom: member.nom, link: member.link }}
            className="mx-4 my-2 hover:translate-[1px] hover:underline"
          >
            <div className=" flex justify-between items-center font-main font-medium bg-admin-nav-bg p-6 rounded-3xl">
              <p>{member.nom}</p>
              <ExternalLink size={26} color="#232323" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MembersListPage;

import { ExternalLink } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PagesListPage = () => {
  const pages_titles = [
    { title: "Page d'accueil", link: "accueil" },
    { title: "Page de master", link: "master" },
    { title: "Page du laboratoire CHArt", link: "lab-chart" },
    {
      title: "Page des collaborations nationales",
      link: "collaboration-nationale",
    },
    {
      title: "Page des collaborations internationales",
      link: "collaboration-internationale",
    },
  ];

  return (
    <main>
      <h1 className="text-display font-semibold mx-14 mt-20">
        Gestion des pages
      </h1>

      <div className="grid grid-cols-2 max-md:grid-cols-1 mx-14 my-4">
        {pages_titles.map((page, index) => (
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            key={index}
            to={`/admin/gestion-pages/${page.link}`}
            state={{ title: page.title, link: page.link }}
            className="mx-4 my-2 hover:translate-[1px] hover:underline"
          >
            <div className=" flex justify-between items-center font-main font-medium bg-admin-nav-bg p-6 rounded-3xl">
              <p>{page.title}</p>
              <ExternalLink size={26} color="#232323" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default PagesListPage;

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "../../api/api";
import ReactMarkdown from "react-markdown";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const lang = localStorage.getItem("lang") || "fr";

  const fetchData = async () => {
    try {
      const response = await api.get(`/projects?lang=${lang}`);
      setProjects(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label={t("breadcrumb")}
        className="mb-10 my-1 p-1.5 py-1 w-full bg-bg-crumb rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-black leading-loose text-breadcrumb"
      >
        <Link
          to="/"
          className="px-4 py-1 rounded-xl hover:underline hover:bg-hover-crumb"
        >
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">{t("formation.link")}</span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-[#663114] bg-bg-transparent dark:text-black">
          {t("formation.projects.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2 readerMode:w-fit readerMode:mx-auto">
        {t("formation.projects.title")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

        {projects.map((project, index) => (
          <>
            <div className="w-full" key={project.idProjet}>
              <div className="flex flex-row items-start justify-between max-large-large:flex-col readerMode:flex-col">
                <div>
                  <h2 className="font-semibold font-main text-dynamic-xl my-2">
                    {project.titre}
                  </h2>

                  <div className="minimal:hidden block">
                    <h3 className="font-semibold text-dynamic-lg my-2">
                      {t("formation.projects.members")}
                    </h3>
                    <ul className="list-disc mx-7">
                      {project.membres.map((membre, index) => (
                        <li key={index}>
                          {membre.prenom + " " + membre.nom.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="my-2">
                    <span className="font-semibold">
                      {t("formation.projects.year")} :{" "}
                    </span>
                    {project.annee}
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center max-large-medium:flex-col max-large-large:mx-auto readerMode:flex-col readerMode:mx-auto">
                  {project.images.map((image, index) => (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/${image.path}`}
                      alt={image.alt}
                      width={275}
                      className="mx-4 minimal:hidden max-large-large:my-6 max-large-medium:w-[30rem] max-large-medium:h-[30rem] max-lg:w-64 max-lg:h-64 max-xl:w-60 max-xl:h-60 readerMode:my-4 rounded-3xl "
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-semibold text-dynamic-lg my-2">
                {t("formation.projects.objective")}
              </h3>
              <ReactMarkdown
                className="m-2"
                children={String(project.objectif)}
              />
            </div>

            <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
          </>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;

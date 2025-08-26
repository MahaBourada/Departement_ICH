import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api/api";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "../../components/Breadcrumb";
import { House } from "lucide-react";

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
      <title>{`${t("formation.projects.title")} - ${t("title")}`}</title>
      <meta name="description" content={t("meta.desc.projects")} />

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
            label: t("formation.link"),
          },
          {
            label: t("formation.projects.title"),
          },
        ]}
      />

      <h1 className="font-main dyslexiaTheme:font-dyslexia font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 readerMode:w-fit readerMode:mx-auto">
        {t("formation.projects.title")}
      </h1>

      <div className="mx-4 max-sm:mx-0 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

        {projects.map((project) => (
          <div key={project.idProjet}>
            <div className="w-full">
              <div className="flex flex-row items-start justify-between max-large-large:flex-col readerMode:flex-col">
                <div>
                  <h2 className="font-semibold font-main dyslexiaTheme:font-dyslexia text-dynamic-xl my-2">
                    {project.titre}
                  </h2>

                  <div>
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
                      key={index}
                      src={`${import.meta.env.VITE_BASE_URL}/${image.path}`}
                      alt={image.alt}
                      width={275}
                      className="mx-4 minimal:hidden max-lg:my-5 max-lg:w-full max-lg:h-1/2 readerMode:my-4 rounded-3xl readerMode:w-1/2 readerMode:h-fit"
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-semibold text-dynamic-lg my-2">
                {t("formation.projects.objective")}
              </h3>

              <ReactMarkdown
                className="m-2 markdown"
                children={String(project.objectif)}
              />
            </div>

            <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;

import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import projectData from "../../data/projects.json";

const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="my-1 mb-5 p-1.5 w-fit rounded-xl flex items-center font-medium max-large-medium:hidden"
      >
        <Link
          to="/"
          className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]"
        >
          {t("home.link")}
        </Link>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl text-dark-accent bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.link")}
        </span>
        <ChevronRight size={33} color="#232323" strokeWidth={2} />
        <span className="px-4 py-2 rounded-xl hover:text-dark-accent hover:bg-bg-transparent hover:underline hover:translate-[1px]">
          {t("department.projects_title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-display my-2">
        {t("department.projects_title")}
      </h1>

      <div className="mx-4 max-md:mx-2">
        <div className="border-black border-[1px] my-5 w-full"></div>

        {projectData.map((project, index) => (
          <>
            <div className="text-body w-full" key={index}>
              <div className="flex flex-row items-start justify-between max-large-large:flex-col">
                <div>
                  <h3 className="font-semibold font-main text-header my-2">
                    {project.name}
                  </h3>

                  <div className="minimal:hidden block">
                    <h4 className="font-semibold text-2xl my-2">Membres</h4>
                    <ul className="list-disc mx-7">
                      {project.members.split(",").map((name, index) => (
                        <li key={index}>{name.trim()}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="minimal:block hidden">
                    <span className="font-semibold">Membres : </span>{" "}
                    {project.members}
                  </div>

                  <p className="my-2">
                    <span className="font-semibold">Année : </span>
                    {project.year}
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center max-large-medium:flex-col max-large-large:mx-auto">
                  {project.images.map((image, index) => (
                    <img
                      src={image}
                      alt=""
                      width={275}
                      className="mx-4 minimal:hidden max-large-large:my-6 max-large-medium:w-[30rem] max-lg:w-64 max-xl:w-60"
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-2xl my-2">Objectif</h4>
              <p className="m-2">{project.objectif}</p>
            </div>

            <div className="border-black border-[1px] my-5 w-full"></div>
          </>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;

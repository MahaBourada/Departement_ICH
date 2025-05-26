import { ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import projectData from "../../data/projects.json";

const ProjectsPage = () => {
  const { t } = useTranslation();

  const darkTheme = localStorage.getItem("theme");

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
      <nav
        aria-label="Fil d'Ariane"
        className="mb-10 my-1 p-1.5 py-1 w-full bg-gray-200 rounded-xl flex items-center font-medium max-large-medium:hidden readerMode:hidden dark:bg-black"
      >
        <Link to="/" className="px-4 py-1 rounded-xl">
          {t("home.link")}
        </Link>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl text-dark-accent bg-bg-transparent dark:text-black">
          {t("department.link")}
        </span>
        <ChevronRight
          size={33}
          className="text-[#232323] dark:text-gray-300"
          strokeWidth={2}
        />
        <span className="px-4 py-1 rounded-xl">
          {t("department.projects.title")}
        </span>
      </nav>

      <h1 className="font-main font-semibold text-dynamic-2xl my-2 readerMode:w-fit readerMode:mx-auto">
        {t("department.projects.title")}
      </h1>

      <div className="mx-4 max-md:mx-2 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto max-large-medium:readerMode:w-full">
        <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>

        {projectData.map((project, index) => (
          <>
            <div className="w-full" key={index}>
              <div className="flex flex-row items-start justify-between max-large-large:flex-col readerMode:flex-col">
                <div>
                  <h2 className="font-semibold font-main text-dynamic-xl my-2">
                    {project.name}
                  </h2>

                  <div className="minimal:hidden block">
                    <h3 className="font-semibold text-dynamic-lg my-2">
                      {t("department.projects.members")}
                    </h3>
                    <ul className="list-disc mx-7">
                      {project.members.split(",").map((name, index) => (
                        <li key={index}>{name.trim()}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="my-2">
                    <span className="font-semibold">
                      {t("department.projects.year")} :{" "}
                    </span>
                    {project.year}
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center max-large-medium:flex-col max-large-large:mx-auto readerMode:flex-col readerMode:mx-auto">
                  {project.images.map((image, index) => (
                    <img
                      src={image}
                      alt=""
                      width={275}
                      className="mx-4 minimal:hidden max-large-large:my-6 max-large-medium:w-[30rem] max-lg:w-64 max-xl:w-60 readerMode:my-4"
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-dynamic-lg my-2">
                {t("department.projects.objective")}
              </h4>
              <p className="m-2">{project.objectif}</p>
            </div>

            <div className="border-black dark:border-gray-300 border-[1px] my-5 w-full"></div>
          </>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;

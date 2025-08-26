import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { House } from "lucide-react";
import { useTranslation } from "react-i18next";

const CreditsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto">
      <title>{`${t("footer.credits")} - ${t("title")}`}</title>
      <meta name="description" content={t("meta.desc.credits")} />

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
            label: t("footer.credits"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 readerMode:w-fit readerMode:mx-auto">
        {t("footer.credits")}
      </h1>

      <ul className="list-disc px-10">
        <li>
          <strong>Design et développement par :</strong>{" "}
          <a
            href="https://www.linkedin.com/in/maha-marwa-bourada/"
            target="_blank"
            className="mx-1 transition-colors duration-300 hover:bg-hover-main dark:hover:bg-dark-main-focus rounded-lg hover:underline px-1.5 py-0.5"
          >
            Maha Marwa Bourada
          </a>
        </li>
      </ul>
    </main>
  );
};

export default CreditsPage;

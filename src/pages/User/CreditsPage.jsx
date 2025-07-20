import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { House } from "lucide-react";
import { useTranslation } from "react-i18next";

const CreditsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto">
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
    </main>
  );
};

export default CreditsPage;

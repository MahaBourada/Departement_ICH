import { House } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import { useTranslation } from "react-i18next";

const CopyrightPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10">
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
            label: t("footer.copyright.1"),
          },
        ]}
      />

      <h1 className="font-main font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 readerMode:w-fit readerMode:mx-auto">
        {t("footer.copyright.1")}
      </h1>
    </main>
  );
};

export default CopyrightPage;

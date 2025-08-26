import { House } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import { useTranslation } from "react-i18next";

const AccessibilityPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow my-10 mb-20 mx-16 max-sm:mx-7 max-md:mx-10 readerMode:leading-loose readerMode:w-[60ch] readerMode:mx-auto">
      <title>{`${t("footer.accessibility")} - ${t("title")}`}</title>
      <meta name="description" content={t("meta.desc.accessibility")} />

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
            label: t("footer.accessibility"),
          },
        ]}
      />

      <h1 className="font-main dyslexiaTheme:font-dyslexia font-semibold text-display max-sm:text-header max-sm:leading-tight my-2 readerMode:w-fit readerMode:mx-auto">
        {t("footer.accessibility")}
      </h1>

      <p>Le site web est accessible en conformité avec les normes W3C</p>

      <div>
        <h2 className="font-main dyslexiaTheme:font-dyslexia font-semibold mt-5">
          Technologies utilisées pour la réalisation du site web :
        </h2>
        <ul className="list-disc px-10">
          <li>React (HTML, CSS, JavaScript)</li>
          <li>Tailwind CSS</li>
        </ul>

        <h2 className="font-main dyslexiaTheme:font-dyslexia font-semibold">
          Les modes utilisés :
        </h2>
        <ul className="list-disc px-10">
          <li>Thème sombre - clair</li>
          <li>Mode confort de lecture</li>
          <li>Mode dyslexie</li>
          <li>Option de zoom</li>
        </ul>

        <h2 className="font-main dyslexiaTheme:font-dyslexia font-semibold">
          Les outils suivants ont été utilisés lors de l'évaluation :
        </h2>
        <ul className="list-disc px-10">
          <li>Wave</li>
          <li>axe DevTools - Web Accessibility Testing</li>
          <li>Lighthouse - Google Chrome</li>
          <li>WCAG - Constrast checker</li>
        </ul>
      </div>
    </main>
  );
};

export default AccessibilityPage;

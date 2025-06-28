import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SmallFilledButton } from "../components/Buttons";

const MissingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="flex-grow flex min-h-screen items-center justify-evenly max-lg:flex-col my-20 mx-auto text-black dark:bg-dark-background dark:text-dark-white">
      <div className="flex flex-col items-center w-[55%] max-lg:w-fit">
        <h1 className="font-main text-5xl max-md:text-lg font-semibold mx-10 mt-24 mb-10 max-lg:my-6 leading-relaxed">
          {t("404.text")}
        </h1>

        <SmallFilledButton
          type="button"
          text={t("404.button")}
          onClick={() => navigate(-1)}
        />
      </div>
      <img
        src="/ich/assets/vectors/404.svg"
        width={600}
        alt=""
        role="presentation"
        className="p-3 dark:hidden" //dark:hidden
      />
      {/* <img
          src="/assets/vectors/404Dark.svg"
          width={600}
          alt=""
          role="presentation"
          className="p-3 hidden dark:block"
        /> */}
    </main>
  );
};

export default MissingPage;

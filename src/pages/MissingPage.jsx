import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MissingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <main className="flex-grow flex items-center justify-evenly max-lg:flex-col my-20 mx-auto text-black">
        <div className="flex flex-col items-center w-[55%] max-lg:w-fit">
          <h1 className="font-main text-5xl max-md:text-lg font-semibold mx-10 mt-24 mb-10 max-lg:my-6 leading-relaxed">
            {t("404.text")}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-accent font-main font-medium text-2xl max-md:text-lg py-5 px-7 max-md:py-4 max-md:px-5 rounded-2xl max-md:rounded-xl hover:underline hover:translate-[1px] cursor-pointer"
          >
            {t("404.button")}
          </button>
        </div>
        <img
          src="/ich/assets/vectors/404.svg"
          width={600}
          alt=""
          role="presentation"
          className="p-3 " //dark:hidden
        />
        {/* <img
          src="/assets/vectors/404Dark.svg"
          width={600}
          alt=""
          role="presentation"
          className="p-3 hidden dark:block"
        /> */}
      </main>
    </>
  );
};

export default MissingPage;

import { useNavigate } from "react-router-dom";

const MissingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="flex-grow flex items-center justify-evenly max-lg:flex-col my-20 mx-auto text-black">
        <div className="flex flex-col items-center w-2/5 max-lg:w-fit">
          <h1 className="font-main text-5xl max-md:text-lg font-semibold mx-10 my-24 max-lg:my-6 leading-relaxed">
            Erreur 404 : La page a pris la fuite...
          </h1>
          <button onClick={() => navigate(-1)} className="bg-accent font-main font-medium text-header max-md:text-xl py-5 px-7 max-md:py-4 max-md:px-5 rounded-3xl max-md:rounded-2xl shadow-small hover:underline hover:translate-[1px] hover:shadow-none cursor-pointer">
            Revenir en arrière
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

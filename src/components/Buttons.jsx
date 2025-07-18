import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SmallFilledButton = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 mx-3 my-1 text-black bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-sm:w-fit max-md:w-42 max-md:mb-4 text-nav max-sm:text-[1.125rem] leading-normal`}
    >
      {text}
    </button>
  );
};

export const BigFilledButton = ({ type, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer text-black font-main font-medium rounded-xl px-5 py-3 my-3 bg-accent transition-colors duration-300 hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white w-full text-nav max-sm:text-[1.125rem] leading-normal`}
    >
      {text}
    </button>
  );
};

export const SmallBorderButton = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer border-2 text-black dark:text-dark-white border-black dark:border-dark-white font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:bg-neutral-300 transition-colors duration-300 dark:hover:bg-neutral-600 max-sm:w-fit max-md:w-42 max-md:mx-3 text-nav max-sm:text-[1.125rem] leading-normal`}
    >
      {text}
    </button>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // small delay so the DOM has time to load
  };

  return (
    <button
      onClick={handleBack}
      className="cursor-pointer inline-block w-fit rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 mb-5"
      aria-label={
        localStorage.getItem("lang") === "fr"
          ? "Retourner en arrière"
          : "Go back"
      }
    >
      <CircleArrowLeft
        size={40}
        strokeWidth={2}
        className="text-[#232323] dark:text-gray-300"
      />
    </button>
  );
};

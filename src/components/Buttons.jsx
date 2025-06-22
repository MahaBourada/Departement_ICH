export const SmallFilledButton = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer font-main font-medium rounded-xl h-fit px-5 py-3 mx-3 my-1 text-black bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white max-md:w-42 max-md:mb-4 text-nav leading-normal`}
    >
      {text}
    </button>
  );
};

export const BigFilledButton = ({ type, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer text-black font-main font-medium rounded-xl px-5 py-3 my-3 bg-accent hover:bg-hover-accent dark:bg-dark-accent dark:hover:bg-dark-hover-accent dark:text-dark-white w-full text-nav leading-normal`}
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
      className={`cursor-pointer border-2 text-black dark:text-dark-white border-black dark:border-dark-white font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:bg-neutral-300 dark:hover:bg-neutral-600 max-md:w-42 max-md:mx-3 text-nav leading-normal`}
    >
      {text}
    </button>
  );
};

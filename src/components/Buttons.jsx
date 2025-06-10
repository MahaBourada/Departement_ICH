export const SmallFilledButton = ({ type, bgColor, color, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${color} font-main font-medium rounded-xl h-fit px-5 py-3 mx-3 my-1 hover:bg-dark-accent dark:bg-dark-accent max-md:w-42 max-md:mb-4 text-nav leading-normal`}
    >
      {text}
    </button>
  );
};

export const BigFilledButton = ({ type, bgColor, color, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${color} font-main font-medium rounded-xl px-5 py-3 my-3 hover:bg-dark-accent w-full text-nav leading-normal`}
    >
      {text}
    </button>
  );
};

export const SmallBorderButton = ({
  type,
  bgColor,
  color,
  text,
  borderColor,
}) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${color} border-2 ${borderColor} font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:bg-neutral-300 max-md:w-42 max-md:mx-3 text-nav leading-normal`}
    >
      {text}
    </button>
  );
};

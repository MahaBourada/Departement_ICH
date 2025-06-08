export const SmallFilledButton = ({ type, bgColor, color, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${color} font-main font-medium rounded-xl h-fit px-5 py-3 mx-3 my-1 hover:translate-[1px] hover:shadow-none max-md:w-42 max-md:mb-4 text-nav`}
    >
      {text}
    </button>
  );
};

export const BigFilledButton = ({ type, bgColor, color, text }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${color} font-main font-medium rounded-xl px-5 py-3 my-3 hover:translate-[1px] hover:shadow-none w-full text-nav`}
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
      className={`cursor-pointer ${bgColor} ${color} border-2 ${borderColor} font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 hover:translate-[1px] hover:shadow-none max-md:w-42 max-md:mx-3 text-nav`}
    >
      {text}
    </button>
  );
};

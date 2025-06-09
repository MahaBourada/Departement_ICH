export const InputField = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col leading-normal">
      <label htmlFor={name} className="font-main font-medium my-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextAreaField = ({
  label,
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col leading-normal">
      <label htmlFor={name} className="font-main font-medium my-1">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        rows="5"
        placeholder={placeholder}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const ImageField = ({ text, name, alt, file, onChange }) => {
  return (
    <div className="flex flex-row items-start justify-between leading-normal">
      <div className="flex flex-col mb-3 w-[49%]">
        <label htmlFor={name} className="font-main font-medium my-1">
          {text}
        </label>
        <input
          type="file"
          accept="image/*"
          name={name}
          id={name}
          onChange={onChange}
          className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 active:translate-[1px] dark:text-black dark:bg-gray-400 dark:border-gray-700"
        />
      </div>
      {file && <img src={file} alt={alt} className="w-1/4 m-auto p-5" />}
    </div>
  );
};

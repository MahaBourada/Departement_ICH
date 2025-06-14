import { Trash2 } from "lucide-react";

export const InputField = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col leading-normal my-4">
      <label htmlFor={name} className="font-main font-medium my-2">
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
    <div className="flex flex-col leading-normal my-2">
      <label htmlFor={name} className="font-main font-medium my-2">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        rows={5}
        placeholder={placeholder}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const SelectField = ({
  label,
  placeholder,
  name,
  onChange,
  initialValue,
  values,
}) => {
  return (
    <div className="flex flex-col leading-normal w-1/2 mr-2 my-4">
      <label htmlFor={name} className="font-main font-medium my-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.9rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={initialValue}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ImageField = ({
  text,
  name,
  alt,
  file,
  onChange,
  onRemove,
  inputRef,
}) => {
  return (
    <div className="flex flex-row items-start justify-between leading-normal my-6">
      <div className="flex flex-col mb-3 w-[49%]">
        <div className="flex items-center justify-between my-3">
          <label htmlFor={name} className="font-main font-medium my-2">
            {text}
          </label>
          <button
            className="cursor-pointer hover:translate-[1px]"
            type="button"
            onClick={onRemove}
          >
            <Trash2
              aria-label="Supprimer un membre du projet"
              size={30}
              className="text-[#8B0000] dark:text-red-400"
              strokeWidth={2.25}
            />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          name={name}
          id={name}
          ref={inputRef}
          onChange={onChange}
          className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 active:translate-[1px] dark:text-black dark:bg-gray-400 dark:border-gray-700"
        />
      </div>
      {file && <img src={file} alt={alt} className="w-1/4 m-auto p-5" />}
    </div>
  );
};

import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

export const InputField = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  value,
  isRequired,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="relative flex flex-col leading-normal my-4">
      <label htmlFor={name} className="font-main font-medium my-2">
        {label}
      </label>
      <input
        required={isRequired}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          aria-label={
            showPass ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          className="cursor-pointer rounded-md hover:bg-neutral-300 absolute top-[73%] right-5 transform -translate-y-1/2"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? (
            <EyeOff className="text-[#444] dark:text-[#111111]" size={31} />
          ) : (
            <Eye className="text-[#444] dark:text-[#111111]" size={31} />
          )}
        </button>
      )}
    </div>
  );
};

export const TextAreaField = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  isRequired,
  maxLength,
}) => {
  return (
    <div className="relative flex flex-col leading-normal my-2">
      <label htmlFor={name} className="font-main font-medium my-2">
        {label}
      </label>
      <textarea
        required={isRequired}
        name={name}
        id={name}
        rows={5}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.75rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700 ${
          maxLength ? "pb-9" : ""
        }`}
        value={value}
        onChange={onChange}
      />
      {maxLength && (
        <p
          className={`absolute bottom-1 right-5 text-dynamic-sm transform ${
            value?.length >= maxLength
              ? "text-red-600 font-semibold"
              : "text-neutral-600"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {value?.length}/{maxLength}
          {value?.length >= maxLength && " — Limite atteinte"}
        </p>
      )}
    </div>
  );
};

export const SelectField = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  values,
  isRequired,
}) => {
  return (
    <div className="flex flex-col leading-normal my-4">
      <label htmlFor={name} className="font-main font-medium my-2">
        {label}
      </label>
      <select
        required={isRequired}
        name={name}
        id={name}
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.9rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {values.map((val, index) => (
          <option key={index} value={val}>
            {val}
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
            className="cursor-pointer p-0.5 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
            type="button"
            onClick={onRemove}
          >
            <Trash2
              aria-label="Supprimer l'image"
              size={30}
              className="text-[#8B0000] dark:text-red-400"
              strokeWidth={2}
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

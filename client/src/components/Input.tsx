import React, { ChangeEventHandler } from "react";

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const Input: React.FC<InputProps & Pick<HTMLInputElement, "type">> = ({
  name,
  label,
  onChange,
  type,
  placeholder,
  disabled,
}) => {
  return (
    <div className="p-3">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

import React, { ChangeEventHandler } from "react";

export type CheckBoxProps = {
  label?: string;
  name?: string;
  value?: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-start p-3">
      <div className="flex items-center h-5">
        <input
          id={name}
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        />
      </div>
      {label && (
        <label
          htmlFor={name}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;

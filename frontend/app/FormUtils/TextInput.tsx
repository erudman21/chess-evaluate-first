import { ErrorMessage, useField } from "formik";
import React from "react";

interface TextInputProps {
  name: string;
  label?: string;
  type?: string;
  autoFocus?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  label,
  name,
  ...props
}) => {
  const [field, { error }] = useField(name);

  return (
    <div className="flex flex-col">
      <label className="capitalize mb-2 text-text-label" htmlFor={name}>
        {label ? label : name}
      </label>
      <input
        {...field}
        {...props}
        name={name}
        className={`w-full h-default-button-height p-search-box rounded-left-nav-bar text-area-input-default`}
        aria-label={name}
        type={type}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div className="text-red-400">{msg}</div>}
      />
    </div>
  );
};

export default TextInput;

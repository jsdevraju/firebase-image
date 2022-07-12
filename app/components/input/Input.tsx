import { useField, ErrorMessage } from "formik";
import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  id?: string;
  name: string;
  className?:string
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  className,
  id
}) => {
  const [field, meta] = useField({ type, name });

  return (
    <>
      <input
        {...field}
        id={id}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
        type={type}
      />
      <ErrorMessage component="small" name={field.name} className="error" />
    </>
  );
};

export default Input;

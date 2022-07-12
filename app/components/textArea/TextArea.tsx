import { useField, ErrorMessage } from "formik";
import React from "react";

interface InputProps {
  placeholder?: string;
  id?: string;
  name: string;
  className?: string;
  cols: number;
  rows: number;
}

const TextArea: React.FC<InputProps> = ({
  placeholder,
  name,
  className,
  id,
  cols,
  rows,
}) => {
  const [field, meta] = useField({ name });

  return (
    <>
      <textarea
        {...field}
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        className={className}
        placeholder={placeholder}
      />
      <ErrorMessage component="small" name={field.name} className="error" />
    </>
  );
};

export default TextArea;

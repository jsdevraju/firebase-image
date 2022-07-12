import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const LabelText: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <>
      <label style={{
        marginTop:"1em",
        marginBottom:"1em",
        display:"block"
      }} htmlFor={htmlFor}>{children}</label>
    </>
  );
};

export default LabelText;

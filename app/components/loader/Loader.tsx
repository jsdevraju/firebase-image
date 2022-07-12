import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"80vh"
    }}>
      <Bars
        width="100"
        color="#0e7490"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loader;

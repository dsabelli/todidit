import React from "react";

const P = ({ children, className }) => {
  return <p className={`pl-6 ${className}`}>{children}</p>;
};

export default P;

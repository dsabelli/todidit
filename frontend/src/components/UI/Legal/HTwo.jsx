import React from "react";

const HTwo = ({ children, className }) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};

export default HTwo;

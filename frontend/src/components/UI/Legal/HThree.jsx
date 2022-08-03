import React from "react";

const HThree = ({ children, className }) => {
  return <h3 className={`text-lg font-bold pl-5 ${className}`}>{children}</h3>;
};

export default HThree;

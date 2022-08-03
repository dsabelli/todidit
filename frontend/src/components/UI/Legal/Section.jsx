import React from "react";

const Section = ({ children, className }) => {
  return (
    <section className={`flex flex-col gap-4 my-4 ${className}`}>
      {children}
    </section>
  );
};

export default Section;

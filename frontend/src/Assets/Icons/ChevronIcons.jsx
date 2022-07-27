import React from "react";

const ChevronIconRight = ({ classNameRight }) => {
  return (
    <div className={`text-neutral ${classNameRight}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-right"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  );
};

const ChevronIconDown = ({ classNameDown }) => {
  return (
    <div className={`text-neutral ${classNameDown}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-down"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  );
};

export { ChevronIconRight, ChevronIconDown };

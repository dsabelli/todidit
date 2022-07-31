import React from "react";

const Dropdown = ({ text, onClick, className, children }) => {
  return (
    <div className={`dropdown ${className}`} onClick={onClick}>
      <label
        tabIndex="0"
        className="text-xs flex flex-col items-start pb-2 cursor-pointer "
      >
        {text || children}
      </label>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;

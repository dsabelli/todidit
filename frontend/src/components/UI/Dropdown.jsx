import React from "react";

const Dropdown = ({ text, onClick, className, children }) => {
  return (
    <div className={`dropdown ${className}`} onClick={onClick}>
      <label tabIndex="0" className="btn m-1">
        {text || children}
      </label>
      <ul
        onClick={(e) => e.target.blur()}
        tabIndex="0"
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;

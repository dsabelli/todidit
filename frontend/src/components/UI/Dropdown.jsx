import React from "react";

const Dropdown = ({ children, text }) => {
  return (
    <div className="dropdown">
      <label tabIndex="0" className="btn m-1">
        {text}
      </label>
      <ul
        tabIndex="0"
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;

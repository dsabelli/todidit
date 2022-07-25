import React from "react";

const Select = ({ defaultValue, children, onChange, className }) => {
  return (
    <select
      onChange={onChange}
      defaultValue={defaultValue}
      className={`select select-bordered w-full max-w-md ${className}`}
    >
      <option value={defaultValue} disabled>
        {defaultValue}
      </option>
      {children}
    </select>
  );
};

export default Select;

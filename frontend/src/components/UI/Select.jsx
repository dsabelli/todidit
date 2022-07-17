import React from "react";

const Select = ({ defaultValue, children, onChange }) => {
  return (
    <select
      onChange={onChange}
      defaultValue={defaultValue}
      className="select w-full max-w-xs"
    >
      <option value={defaultValue} disabled>
        {defaultValue}
      </option>
      {children}
    </select>
  );
};

export default Select;

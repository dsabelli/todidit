import { useState } from "react";

const Toggle = ({ children, visText, invisText, className }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVal) => !prevVal);
  };

  return (
    <div className={className}>
      <div>
        <button className="w-full text-left" onClick={() => toggleVisibility()}>
          {visible ? visText : invisText}
        </button>
      </div>
      <div className={visible ? "" : "hidden"}>{children}</div>
    </div>
  );
};

export default Toggle;

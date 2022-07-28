import { useState } from "react";

const ReverseToggle = ({ children, visText, invisText, className }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible((prevVal) => !prevVal);
  };

  return (
    <div className={className}>
      <div>
        <button onClick={() => toggleVisibility()}>
          {visible ? visText : invisText}
        </button>
      </div>
      <div className={visible ? "" : "hidden"}>{children}</div>
    </div>
  );
};

export default ReverseToggle;

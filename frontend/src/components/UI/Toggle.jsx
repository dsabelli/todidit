import { useState } from "react";

const Toggle = ({ children, visText, invisText }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVal) => !prevVal);
  };

  return (
    <div>
      <div>
        <button onClick={() => toggleVisibility()}>
          {visible ? visText : invisText}
        </button>
      </div>
      <div className={visible ? "" : "hidden"}>{children}</div>
    </div>
  );
};

export default Toggle;

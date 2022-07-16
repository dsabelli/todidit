import { useState } from "react";

const Toggle = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVal) => !prevVal);
  };

  return (
    <div>
      <div>
        <button onClick={() => toggleVisibility()}>
          {visible ? "Hide Archived Projects" : "Archived Projects"}
        </button>
      </div>
      <div className={visible ? "" : "hidden"}>{children}</div>
    </div>
  );
};

export default Toggle;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ children }) => {
  // let navigate = useNavigate();

  return (
    <ul className="menu bg-base-100 w-56">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Projects</div>

        <div className="collapse-content">
          <div>{children}</div>
        </div>
      </div>
    </ul>
  );
};

export default Menu;

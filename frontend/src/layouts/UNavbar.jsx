import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import ToDidit from "../components/UI/ToDidit";

const UNavbar = ({ isLanding }) => {
  return (
    <nav className="navbar bg-base-100 flex px-4 justify-between">
      <ToDidit />
      <div className={`flex gap-4 ${isLanding ? "" : "hidden"} `}>
        <Link to="/login">
          {" "}
          <Button text={"Login"} className="btn-base-content" />
        </Link>
      </div>
    </nav>
  );
};

export default UNavbar;

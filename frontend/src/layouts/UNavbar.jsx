import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import ToDidit from "../Assets/toDidit";

const UNavbar = ({ isLanding }) => {
  return (
    <nav className="navbar bg-base-100 flex px-4 justify-between">
      <div className="flex-1 btn btn-ghost gap-4 justify-start max-w-fit">
        <Link className="flex gap-4" to="/">
          <ToDidit className={"w-8"} themeLines="#FFF" themeCheck="green" />
          <p className=" normal-case text-xl">toDidit</p>
        </Link>
      </div>
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

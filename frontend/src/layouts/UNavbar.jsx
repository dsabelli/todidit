import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const UNavbar = ({ isLanding }) => {
  return (
    <nav className="navbar bg-base-100 flex px-4">
      <div className="flex-1">
        <Link to="/">
          <p className="btn btn-ghost normal-case text-xl">toDidit</p>
        </Link>
      </div>
      <div className={`flex gap-4 ${isLanding ? "" : "hidden"}`}>
        <Link to="/login">
          {" "}
          <Button text={"Login"} />
        </Link>
      </div>
    </nav>
  );
};

export default UNavbar;

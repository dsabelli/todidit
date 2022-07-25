import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo";

const ToDidit = ({ user, className }) => {
  let loggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div className={`btn btn-ghost gap-4  max-w-fit ${className}`}>
      <Link className="flex gap-4" to={loggedIn ? "/app/today" : "/"}>
        <Logo className={"w-8"} themeLines="#FFF" themeCheck="green" />
        <p className=" normal-case text-xl">toDidit</p>
      </Link>
    </div>
  );
};

export default ToDidit;

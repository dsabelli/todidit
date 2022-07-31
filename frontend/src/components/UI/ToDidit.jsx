import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Icons/Logo";

const ToDidit = ({ className, todiditClass, logoClass }) => {
  let loggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div
      className={`btn btn-ghost hover:bg-transparent p-0 max-w-fit ${className}`}
    >
      <Link
        className="flex items-center gap-4"
        to={loggedIn ? "/app/today" : "/"}
      >
        <Logo className={`w-12`} />
        <p className={`self-end normal-case text-2xl ${todiditClass}`}>
          toDidit
        </p>
      </Link>
    </div>
  );
};

export default ToDidit;

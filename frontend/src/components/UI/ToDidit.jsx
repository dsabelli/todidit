import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo";

const ToDidit = ({ user }) => {
  return (
    <div className=" btn btn-ghost gap-4  max-w-fit">
      <Link className="flex gap-4" to={user ? "/app/all" : "/"}>
        <Logo className={"w-8"} themeLines="#FFF" themeCheck="green" />
        <p className=" normal-case text-xl">toDidit</p>
      </Link>
    </div>
  );
};

export default ToDidit;

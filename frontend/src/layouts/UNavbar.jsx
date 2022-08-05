import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import Button from "../components/UI/Button";
import ToDidit from "../components/UI/ToDidit";

const UNavbar = ({ isLanding, username }) => {
  return (
    <nav className="navbar bg-neutral flex px-4 justify-between h-16">
      <ToDidit className="pb-2" todiditClass="text-neutral-content" />
      <div className={`flex gap-4 ${isLanding ? "" : "hidden"} `}>
        <Link to="/login">
          <Button
            text={"Login"}
            className="bg-neutral-content text-neutral-focus hover:bg-neutral-content"
          />
        </Link>
      </div>
      {username && (
        <div className="dropdown dropdown-end p-1">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={`https://avatars.dicebear.com/api/initials/${username[0]}.svg`}
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <UserDropdown />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UNavbar;

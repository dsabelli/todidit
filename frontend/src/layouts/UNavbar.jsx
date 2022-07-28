import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../Assets/Icons/UserIcon";
import Button from "../components/UI/Button";
import ToDidit from "../components/UI/ToDidit";
import LogoutIcon from "../Assets/Icons/LogoutIcon";
import SettingsIcon from "../Assets/Icons/SettingsIcon";

const UNavbar = ({ isLanding, username }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
  };
  return (
    <nav className="navbar bg-neutral flex px-4 justify-between">
      <ToDidit todiditClass="text-neutral-content" />
      <div className={`flex gap-4 ${isLanding ? "" : "hidden"} `}>
        <Link to="/login">
          <Button
            text={"Login"}
            className="btn-disabled bg-neutral-content text-neutral-focus"
          />
        </Link>
      </div>
      {username && (
        <div className="dropdown dropdown-end">
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
            <li>
              <Link to="/profile">
                <UserIcon className="w-5" />
                <p className="w-full text-left">Profile</p>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <SettingsIcon className="w-5" />
                <p className="w-full text-left">Settings</p>
              </Link>
            </li>
            <li>
              <form onSubmit={() => handleLogout()}>
                <LogoutIcon className="w-5" />
                <button className="w-full text-left" type="submit">
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UNavbar;

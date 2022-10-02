import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../Assets/Icons/UserIcon";
import LogoutIcon from "../Assets/Icons/LogoutIcon";
import SettingsIcon from "../Assets/Icons/SettingsIcon";
import BugIcon from "../Assets/Icons/BugIcon";

const UserDropdown = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    window.localStorage.removeItem("loggedIn");
    window.sessionStorage.removeItem("loggedIn");
    window.location.reload();
  };
  return (
    <>
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
      <li>
        <Link to="/contact">
          <BugIcon className="w-5" />
          <p className="w-full text-left">Report an issue</p>
        </Link>
      </li>
    </>
  );
};

export default UserDropdown;

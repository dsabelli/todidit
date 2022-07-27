import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import DiditSearch from "../features/Didits/DiditSearch";
import ToDidit from "../components/UI/ToDidit";
import MenuIcon from "../Assets/Icons/MenuIcon";

const Navbar = ({ projects, menuVisible, onMenuVisible, noSearch }) => {
  const [avatar, setAvatar] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    user &&
      setAvatar(
        `https://avatars.dicebear.com/api/initials/${user.username[0]}.svg`
      );
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
  };
  return (
    <nav className="navbar flex justify-between bg-accent">
      <div className="">
        <MenuIcon
          onClick={() => onMenuVisible((prevVal) => !prevVal)}
          className={"text-neutral mt-1.5 md:hidden"}
        />

        <ToDidit />
      </div>
      <div>
        {!noSearch && <DiditSearch projects={projects} />}
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">
                <p className="justify-between">Profile</p>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <form onSubmit={() => handleLogout()}>
                <button type="submit">Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

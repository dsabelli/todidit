import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import DiditSearch from "../features/Didits/DiditSearch";
import ToDidit from "../components/UI/ToDidit";
import MenuIcon from "../Assets/Icons/MenuIcon";
import Footer from "../components/UI/Footer";

const Navbar = ({ projects, children }) => {
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
    <div className="drawer ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-100">
        {/* <!-- Navbar --> */}
        <div className="w-full flex navbar justify-between bg-accent">
          <div className="flex-none md:hidden">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-square btn-ghost p-0"
            >
              <MenuIcon className="w-6" />
            </label>
          </div>
          <div className="flex-1 pr-2 mr-2">
            <ToDidit todiditClass="text-neutral-content" />
          </div>
          <nav className="flex">
            {<DiditSearch projects={projects} />}
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
                  <Link onClick={() => handleLogout()} to="/">
                    <p>Logout</p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* <!-- Navbar menu content here --> */}
          </nav>
        </div>
        {/* <!-- Page content here --> */}
        <div className=" grid grid-cols-6 gap-x-8 min-h-screen">
          <div className="col-span-2 min-w-fit max-w-xs hidden md:block">
            {" "}
            <ul className="menu pr-1 bg-base-300 h-screen min-h-full text-left text-xl pt-4">
              {" "}
              {children[0]}
            </ul>
          </div>
          <div className=" col-span-6 md:col-span-4 2xl:col-span-3 pl-12 pr-12 md:pl-4">
            {" "}
            {children[1]}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          {children[0]}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

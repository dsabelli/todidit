import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { DiditContext } from "../context/DiditContext";
import DiditSearch from "../features/Didits/DiditSearch";
import ToDidit from "../components/UI/ToDidit";
import MenuIcon from "../Assets/Icons/MenuIcon";
import UserDropdown from "./UserDropdown";
import { useDebounce } from "use-debounce";

const Navbar = ({ projects, children }) => {
  const [avatar, setAvatar] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [debouncedWidth] = useDebounce(width, 500);
  const { user } = useContext(UserContext);
  const { didits } = useContext(DiditContext);
  useEffect(() => {
    user &&
      setAvatar(
        `https://avatars.dicebear.com/api/initials/${user.username[0]}.svg`
      );
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [debouncedWidth]);

  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-100">
        {/* <!-- Navbar --> */}
        <nav className={`w-full  navbar  bg-accent `}>
          <div className="flex-none md:hidden">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-square btn-ghost p-0"
            >
              <MenuIcon className="w-6" />
            </label>
          </div>
          <div className={`flex-1 pb-2 pr-2 mr-2`}>
            <ToDidit logoClass="" todiditClass="text-accent-content" />
          </div>
          <div className="flex h-auto">
            {
              <DiditSearch
                projects={projects}
                popperPlacement="bottom-end"
                className="hidden md:flex"
              />
            }
            <div className="dropdown dropdown-end p-1">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={avatar} />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <UserDropdown />
              </ul>
            </div>

            {/* <!-- Navbar menu content here --> */}
          </div>
        </nav>
        {/* <!-- Page content here --> */}
        <div className=" grid grid-cols-6 gap-x-8 h-full">
          <div className="col-span-2 min-w-fit max-w-xs hidden h-full md:block">
            {" "}
            <ul className="menu pr-1 bg-base-300 h-full text-left text-xl pt-4">
              {" "}
              {width > 768 && children[0]}
            </ul>
          </div>
          <div className=" col-span-6 md:col-span-4 2xl:col-span-3 pl-12 pr-12 md:pl-4 pb-60">
            {" "}
            {children[1]}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          {width <= 768 && children[0]}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

import DiditSearch from "./Didits/DiditSearch";
import Button from "./UI/Button";
import Input from "./UI/Input";
const Navbar = ({ user, onLogout, onNewUser, newUser, projects }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">toDidit</a>
      </div>
      <div>
        {!user && (
          <Button
            onClick={() => onNewUser()}
            text={newUser ? "Cancel" : "Get Started"}
          />
        )}
      </div>
      {user && <DiditSearch projects={projects} />}
      <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
          {user && (
            <div className="w-10 rounded-full">
              <img
                src={`https://avatars.dicebear.com/api/initials/${user.username[0]}.svg`}
              />
            </div>
          )}
        </label>
        <ul
          tabIndex="0"
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <form onSubmit={() => onLogout()}>
              <button type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

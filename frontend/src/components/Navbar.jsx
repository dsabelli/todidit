import React from "react";

const Navbar = ({ user, onLogout, onNewUser, newUser }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">toDid</a>
      </div>
      <div>
        {!user && (
          <button onClick={() => onNewUser()} className="btn">
            {newUser ? "Cancel" : "Get Started"}
          </button>
        )}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
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
    </div>
  );
};
export default Navbar;

import Didit from "./Didit";
import DateRange from "./DateRange";
import Button from "./Button";

const Navbar = ({
  user,
  onLogout,
  onNewUser,
  newUser,
  onDiditSearch,
  diditTitle,
  onDiditDateStart,
  onDiditDateEnd,
}) => {
  let didits;
  if (diditTitle) {
    didits = diditTitle.map((didit) => (
      <Didit key={didit.id} title={didit.title} />
    ));
  }

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
      <div className="flex-none gap-2">
        {user && (
          <>
            <DateRange
              onDiditSearch={onDiditSearch}
              onDiditDateStart={onDiditDateStart}
              onDiditDateEnd={onDiditDateEnd}
            />
          </>
        )}
        <div className="form-control ">
          {user && (
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
              onChange={(e) => onDiditSearch(e.target.value)}
              onFocus={(e) => onDiditSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Escape"
                  ? (e.target.blur(), (e.target.value = ""), onDiditSearch(""))
                  : ""
              }
              onBlur={() => onDiditSearch("")}
            />
          )}
          <div className="overflow-y-auto max-h-48 ">{didits}</div>
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

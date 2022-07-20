import { Link } from "react-router-dom";
import Toggle from "../components/UI/Toggle";

const Menu = ({ children }) => {
  return (
    <ul className="menu bg-base-100 w-56">
      <Link to="/app/all">All</Link>
      <Link to="/app/today">Today</Link>
      <Link to="/app/week">This Week</Link>
      <div className="collapse">
        <Toggle visText="Projects" invisText="Projects">
          <div>{children}</div>
        </Toggle>
      </div>
    </ul>
  );
};

export default Menu;

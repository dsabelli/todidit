import { useState } from "react";
import { Link } from "react-router-dom";
import Toggle from "../components/UI/Toggle";
import StarIcon from "../Assets/StarIcon";
import TodayIcon from "../Assets/TodayIcon";
import WeekIcon from "../Assets/WeekIcon";
import AllIcon from "../Assets/AllIcon";
import { ChevronIconRight, ChevronIconDown } from "../Assets/ChevronIcons";
import { parseJSON } from "date-fns/esm";

const Menu = ({ children, className, tasks }) => {
  //temp, mkake ToggleActive Component
  const [selected, setSelected] = useState(false);
  //finish task numbers for each
  const todayTasks = tasks.filter(
    (task) => parseJSON(task.dueDate) <= new Date()
  ).length;
  return (
    <ul className={`menu pr-1 bg-base-300 h-screen  ${className}`}>
      <li className={` ${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/all">
          <AllIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>All</p> <p className="badge  text-right">{tasks.length}</p>
          </div>
        </Link>
      </li>
      <li className={`${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/today">
          <TodayIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Today</p> <p className="badge text-right">{todayTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/week">
          <WeekIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>This Week</p> <p className="badge  text-right">{tasks.length}</p>
          </div>
        </Link>
      </li>
      <li className={`${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/today">
          <StarIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Important</p> <p className="badge  text-right">{tasks.length}</p>
          </div>
        </Link>
      </li>

      <div className="flex gap-3 pl-5 mt-8  ">
        <Toggle
          className={"w-full"}
          visText={
            <div className="flex items-center gap-2 mb-4">
              <ChevronIconDown classNameDown={"w-5"} /> <p>Projects</p>
            </div>
          }
          invisText={
            <div className="flex items-center gap-2 mb-4">
              <ChevronIconRight classNameRight={"w-5"} /> <p>Projects</p>
            </div>
          }
        >
          <div className="pl-7">{children}</div>
        </Toggle>
      </div>
    </ul>
  );
};

export default Menu;

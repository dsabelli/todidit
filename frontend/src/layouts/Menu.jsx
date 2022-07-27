import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Toggle from "../components/UI/Toggle";
import StarIcon from "../Assets/Icons/StarIcon";
import TodayIcon from "../Assets/Icons/TodayIcon";
import WeekIcon from "../Assets/Icons/WeekIcon";
import AllIcon from "../Assets/Icons/AllIcon";
import {
  ChevronIconRight,
  ChevronIconDown,
} from "../Assets/Icons/ChevronIcons";
import { parseJSON, isThisWeek, format } from "date-fns/esm";
import { DateFormatContext } from "../context/DateFormatContext";

const Menu = ({ children, className, tasks }) => {
  const { dateFormat } = useContext(DateFormatContext);
  const [selected, setSelected] = useState(false);
  const filteredTasks = tasks.filter((task) => !task.isChecked);
  const todayTasks = filteredTasks.filter(
    (task) =>
      format(parseJSON(task.dueDate), dateFormat) ===
        format(new Date(), dateFormat) ||
      new Date().setHours(0, 0, 0, 0) > parseJSON(task.dueDate)
  ).length;
  const weekTasks = filteredTasks.filter((task) =>
    isThisWeek(parseJSON(task.dueDate))
  ).length;
  const importantTasks = filteredTasks.filter(
    (task) => task.isImportant
  ).length;
  return (
    <ul className={`menu pr-1 bg-base-300 h-screen min-h-full  ${className}`}>
      <li className={` ${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/all">
          <AllIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>All</p>
            <p className="badge  text-right">{filteredTasks.length}</p>
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
            <p>This Week</p> <p className="badge  text-right">{weekTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${selected ? "bordered" : "pl-1"}`}>
        <Link to="/app/important">
          <StarIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Important</p>{" "}
            <p className="badge  text-right">{importantTasks}</p>
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
          <div className="">{children}</div>
        </Toggle>
      </div>
    </ul>
  );
};

export default Menu;

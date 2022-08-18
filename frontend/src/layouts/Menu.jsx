import { format, isThisWeek, parseJSON } from "date-fns/esm";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AllIcon from "../Assets/Icons/AllIcon";
import CheckedIcon from "../Assets/Icons/CheckedIcon";
import {
  ChevronIconDown,
  ChevronIconRight,
} from "../Assets/Icons/ChevronIcons";
import StarIcon from "../Assets/Icons/StarIcon";
import TimeMachineAnimation from "../Assets/Icons/TimeMachineAnimation";
import TimeMachineIcon from "../Assets/Icons/TimeMachineIcon";
import TodayIcon from "../Assets/Icons/TodayIcon";
import WeekIcon from "../Assets/Icons/WeekIcon";
import Dropdown from "../components/UI/Dropdown";
import ReverseToggle from "../components/UI/ReverseToggle";
import { DateFormatContext } from "../context/DateFormatContext";
import DiditSearch from "../features/Didits/DiditSearch";
import TimeMachineSearch from "../features/TimeMachine/TimeMachineSearch";

const Menu = ({ children, className, tasks, projects, notes }) => {
  let location = useLocation();
  const path = location.pathname;
  const { dateFormat } = useContext(DateFormatContext);

  const filteredTasks = tasks.filter((task) => !task.isChecked);

  const todayTasks = filteredTasks.filter(
    (task) =>
      format(parseJSON(task.dueDate), dateFormat) ===
        format(new Date(), dateFormat) ||
      new Date().setHours(0, 0, 0, 0) > parseJSON(task.dueDate)
  ).length;

  const weekTasks = filteredTasks.filter((task) =>
    isThisWeek(parseJSON(task.dueDate), { weekStartsOn: 1 })
  ).length;

  const importantTasks = filteredTasks.filter(
    (task) => task.isImportant
  ).length;

  const completedTasks = tasks.filter((task) => task.isChecked).length;

  return (
    <>
      <li className={` ${path.includes("all") ? "bordered" : "pl-1"}`}>
        <Link to="/app/all">
          <AllIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>All</p>
            <p className="badge  text-right">{filteredTasks.length}</p>
          </div>
        </Link>
      </li>
      <li className={`${path.includes("today") ? "bordered" : "pl-1"}`}>
        <Link to="/app/today">
          <TodayIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Today</p> <p className="badge text-right">{todayTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${path.includes("week") ? "bordered" : "pl-1"}`}>
        <Link to="/app/week">
          <WeekIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>This Week</p> <p className="badge text-right">{weekTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${path.includes("important") ? "bordered" : "pl-1"}`}>
        <Link to="/app/important">
          <StarIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Important</p>{" "}
            <p className="badge text-right">{importantTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${path.includes("completed") ? "bordered" : "pl-1"}`}>
        <Link to="/app/completed">
          <CheckedIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Completed</p>{" "}
            <p className="badge text-right">{completedTasks}</p>
          </div>
        </Link>
      </li>
      <li className={`${path.includes("notes") ? "bordered" : "pl-1"}`}>
        <Link to="/app/notes">
          <CheckedIcon className={"w-5"} />
          <div className="flex justify-between w-full items-center">
            <p>Notes</p> <p className="badge text-right">{notes.length}</p>
          </div>
        </Link>
      </li>

      <li className={`mt-4 ${path.includes("time") ? "bordered" : "pl-1"}`}>
        <div className="flex items-center">
          <TimeMachineIcon className="w-6" />
          <Dropdown
            className="w-full"
            textClass="text-base md:text-xl"
            text="Time Machine"
          >
            <TimeMachineSearch />
          </Dropdown>
          {path.includes("time") && <TimeMachineAnimation />}
        </div>
      </li>

      <DiditSearch
        projects={projects}
        className="mt-4 ml-6 flex-col md:hidden"
        popperPlacement="top"
      />

      <div className="flex gap-3 pl-5 mt-8 ">
        <ReverseToggle
          className="w-full"
          visText={
            <div className="flex items-center gap-2 mb-4 ">
              <ChevronIconDown classNameDown={"w-5"} />{" "}
              <p className="w-full pl-1">Projects</p>
            </div>
          }
          invisText={
            <div className="flex items-center gap-2 mb-4">
              <ChevronIconRight classNameRight={"w-5"} /> <p>Projects</p>
            </div>
          }
        >
          <div className="">{children}</div>
        </ReverseToggle>
      </div>
    </>
  );
};

export default Menu;

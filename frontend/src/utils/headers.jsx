import { format, parseJSON, startOfWeek } from "date-fns";
import AllIcon from "../Assets/Icons/AllIcon";
import ArchiveIcon from "../Assets/Icons/ArchiveIcon";
import CheckedIcon from "../Assets/Icons/CheckedIcon";
import NotesIcon from "../Assets/Icons/NotesIcon";
import StarIcon from "../Assets/Icons/StarIcon";
import TimeMachineIcon from "../Assets/Icons/TimeMachineIcon";
import TodayIcon from "../Assets/Icons/TodayIcon";
import WeekIcon from "../Assets/Icons/WeekIcon";

const getHeader = (location, params, projects) => {
  const date = new Date();
  const classNameDivWrapper = "flex gap-2 items-center mt-6 mb-1";
  const classNameH1 = "text-left text-2xl";
  const classNameP = "text-left text-sm mb-4 opacity-70";

  let header;

  switch (true) {
    case location.pathname.includes("all"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <AllIcon className="w-6" />
            <h1 className={classNameH1}>All</h1>
          </div>
          <p className={classNameP}>{}</p>
        </>
      );
      break;
    case location.pathname.includes("today"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <TodayIcon className="w-6" />
            <h1 className={classNameH1}>Today</h1>
          </div>
          <p className={classNameP}>{format(date, "EEEE, MMM dd")}</p>
        </>
      );
      break;
    case location.pathname.includes("week"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <WeekIcon className="w-6" />
            <h1 className={classNameH1}>The Week of</h1>
          </div>
          <p className={classNameP}>
            {format(startOfWeek(date, { weekStartsOn: 1 }), "MMM dd, yyyy")}
          </p>
        </>
      );
      break;
    case location.pathname.includes("important"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <StarIcon className="w-6" />
            <h1 className={classNameH1}>Important</h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("completed"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <CheckedIcon className="w-6" />
            <h1 className={classNameH1}>Completed</h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("notes"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <NotesIcon className="w-6" />
            <h1 className={classNameH1}>Notes</h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("archived"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <ArchiveIcon className="w-6" />
            <h1 className={classNameH1}>
              {projects.find((project) => project.id === params.id).title}
            </h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("project"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <h1 className={classNameH1}>
              {projects.find((project) => project.id === params.id).title}
            </h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("didit"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <h1 className={classNameH1}>Didit Archive</h1>
          </div>
          <p className={classNameP}></p>
        </>
      );
      break;
    case location.pathname.includes("time"):
      header = (
        <>
          <div className={classNameDivWrapper}>
            <TimeMachineIcon className="w-6" />
            <h1 className={classNameH1}>Time Machine</h1>
          </div>
          <p className={classNameP}>
            {format(parseJSON(params.date), "EEEE, MMM dd yyyy")}
          </p>
        </>
      );
      break;
    default:
      header = (
        <>
          <div className={classNameDivWrapper}>
            <h1 className={classNameH1}>Try a route from the menu!</h1>
          </div>
        </>
      );
  }
  return <div>{header}</div>;
};
export { getHeader };

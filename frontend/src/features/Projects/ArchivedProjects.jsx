import { useContext } from "react";
import { DateFormatContext } from "../../context/DateFormatContext";
import { parseJSON, format } from "date-fns";
import { Link } from "react-router-dom";
import Toggle from "../../components/UI/Toggle";
import {
  ChevronIconDown,
  ChevronIconRight,
} from "../../Assets/Icons/ChevronIcons";

const ArchivedProjects = ({ projects }) => {
  const { dateFormat } = useContext(DateFormatContext);

  const formattedProjects = projects
    .filter((project) => project.isArchived)
    .map((project) => ({
      ...project,
      archivedOn: format(parseJSON(project.archivedOn), dateFormat),
    }));

  const projectElements = formattedProjects.map((project) => (
    <li key={project.id}>
      <Link
        className="p-0"
        to={`/app/project/archived/${project.id}`}
        id={project.id}
      >
        <div className="">
          <p className="text-sm">{project.title}</p>
          <p className="text-2xs">Archived: {project.archivedOn}</p>
        </div>
      </Link>
    </li>
  ));

  return (
    <Toggle
      className={"w-full text-lg opacity-60 mt-10"}
      visText={
        <div className="flex items-center gap-2 mb-4">
          <ChevronIconDown classNameDown={"w-5"} /> <p>Archived Projects</p>
        </div>
      }
      invisText={
        <div className="flex items-center gap-2 mb-4">
          <ChevronIconRight classNameRight={"w-5"} /> <p>Archived Projects</p>
        </div>
      }
    >
      <ul className="menu flex flex-col max-h-80 overflow-y-auto pl-7   ">
        {projectElements.reverse()}
      </ul>
    </Toggle>
  );
};

export default ArchivedProjects;

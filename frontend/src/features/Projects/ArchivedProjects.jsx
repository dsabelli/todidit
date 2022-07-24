import { useContext } from "react";
import { DateFormatContext } from "../../context/DateFormatContext";
import { parseJSON, format } from "date-fns";
import { Link } from "react-router-dom";
import Toggle from "../../components/UI/Toggle";

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
          <p className="text-base"> {project.title}</p>
          <p className="text-2xs">Archived: {project.archivedOn}</p>
        </div>
      </Link>
    </li>
  ));

  return (
    <Toggle visText="Hide Archived Projects" invisText="Archived Projects">
      <ul className=" overflow-y-auto max-h-96 flex flex-col  menu  ">
        {projectElements.reverse()}
      </ul>
    </Toggle>
  );
};

export default ArchivedProjects;

import { useContext } from "react";
import { DateFormatContext } from "../context/DateFormatContext";
import { parseJSON, format } from "date-fns";
import { Link } from "react-router-dom";
import Toggle from "../UI/Toggle";

const ArchivedProjects = ({ projects }) => {
  const { dateFormat } = useContext(DateFormatContext);

  const formattedProjects = projects
    .filter((project) => project.isArchived)
    .map((project) => ({
      ...project,
      archivedOn: format(parseJSON(project.archivedOn), dateFormat),
    }));

  const projectElements = formattedProjects.map((project) => (
    <Link
      to={`/app/project/archived/${project.id}`}
      key={project.id}
      id={project.id}
    >
      <div>
        {project.title}
        <p>{project.archivedOn}</p>
      </div>
    </Link>
  ));

  return (
    <div className="overflow-y-auto max-h-96 flex flex-col ">
      <Toggle visText="Hide Archived Projects" invisText="Archived Projects">
        {projectElements.reverse()}
      </Toggle>
    </div>
  );
};

export default ArchivedProjects;

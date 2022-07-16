import { parseJSON, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import Toggle from "../UI/Toggle";
const ArchivedProjects = ({ projects }) => {
  const projectElements = projects.map((project) =>
    project.isArchived ? (
      <Link
        to={`/app/project/archived/${project.id}`}
        key={project.id}
        id={project.id}
      >
        <div> {project.title}</div>
      </Link>
    ) : null
  );

  return (
    <div className="overflow-y-auto max-h-96 flex flex-col ">
      <Toggle> {projectElements}</Toggle>
    </div>
  );
};

export default ArchivedProjects;

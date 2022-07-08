import { useState } from "react";
import ProjectForm from "./ProjectForm";
import Button from "./Button";

const Menu = ({
  projects,
  onProjectId,
  onUpdate,
  onDelete,
  onProjectUpdate,
  onTitleChange,
  cancel,
  title,
  children,
}) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projectElements = projects.map((project) =>
    !project.isArchived ? (
      !project.isEditing ? (
        <li key={project.id} onClick={() => setSelectedProject(project.title)}>
          <a onClick={() => onProjectId(project.id)}>
            {project.title}
            <div className="flex gap-4">
              <Button onClick={(e) => onUpdate(e, project.id)} text={"edit"} />
              <Button
                onClick={(e) => onDelete(e, project.id)}
                className="btn-square"
                text={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              />
            </div>
          </a>
        </li>
      ) : (
        <ProjectForm
          onSubmit={(e) => onProjectUpdate(e, project.id)}
          onChange={(e) => onTitleChange(e.target.value)}
          onClick={cancel}
          value={title}
          id={project.id}
          key={project.id}
        />
      )
    ) : (
      ""
    )
  );
  return (
    <ul className="menu bg-base-100 w-56">
      <Button text="Today" />
      <Button text="All" />
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Projects</div>

        <div>{children}</div>
        <div className="collapse-content">
          <ul>{projectElements}</ul>
        </div>
      </div>
    </ul>
  );
};

export default Menu;

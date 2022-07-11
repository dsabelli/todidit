import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import Button from "./UI/Button";
import DeleteSvg from "./svg/DeleteSvg";

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
  let navigate = useNavigate();
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
                text={<DeleteSvg />}
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
          submitText="save"
        />
      )
    ) : (
      ""
    )
  );
  return (
    <ul className="menu bg-base-100 w-56">
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

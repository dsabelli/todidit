import { useState } from "react";
import UpdateProjectForm from "./UpdateProjectForm";

const Menu = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projects = props.projects.map((project) =>
    !project.isEditing ? (
      <li key={project.id} onClick={() => setSelectedProject(project.title)}>
        <a onClick={() => props.onProjectId(project.id)}>
          {project.title}
          <div className="flex gap-4">
            <button
              className="btn"
              onClick={(e) => {
                props.onUpdate(e, project.id);
              }}
            >
              edit
            </button>
          </div>
        </a>
      </li>
    ) : (
      <UpdateProjectForm
        onProjectUpdate={props.onProjectUpdate}
        onTitleChange={props.onTitleChange}
        cancel={props.cancel}
        title={props.title}
        id={project.id}
        key={project.id}
      />
    )
  );
  return (
    <ul className="menu bg-base-100 w-36">
      <button className="btn">All</button>
      <button className="btn">Today</button>
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Projects</div>

        <div>{props.children}</div>
        <div className="collapse-content">
          <ul>{projects}</ul>
        </div>
      </div>
    </ul>
  );
};

export default Menu;

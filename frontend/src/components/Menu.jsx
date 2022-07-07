import { useState } from "react";
import UpdateProjectForm from "./UpdateProjectForm";
import Button from "./Button";

const Menu = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projects = props.projects.map((project) =>
    !project.isArchived ? (
      !project.isEditing ? (
        <li key={project.id} onClick={() => setSelectedProject(project.title)}>
          <a onClick={() => props.onProjectId(project.id)}>
            {project.title}
            <div className="flex gap-4">
              <Button
                onClick={(e) => props.onUpdate(e, project.id)}
                text={"edit"}
              />
              <Button
                onClick={(e) => props.onDelete(e, project.id)}
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
              {/* <button
                className="btn"
                onClick={(e) => {
                  props.onUpdate(e, project.id);
                }}
              >
                edit
              </button> */}
              {/* <button
                className={`btn btn-square `}
                onClick={(e) => {
                  props.onDelete(e, project.id);
                }}
              >
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
              </button> */}
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

        <div>{props.children}</div>
        <div className="collapse-content">
          <ul>{projects}</ul>
        </div>
      </div>
    </ul>
  );
};

export default Menu;

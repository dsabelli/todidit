import { useState } from "react";
import DueDate from "./DueDate";
import Button from "./Button";

const CreateTaskForm = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projects = props.projects.map((project) =>
    !project.isArchived ? (
      <li key={project.id} onClick={() => setSelectedProject(project.title)}>
        <a onClick={() => props.onProjectId(project.id)}>{project.title}</a>
      </li>
    ) : (
      ""
    )
  );

  return (
    <form onSubmit={(e) => props.onTaskCreation(e)}>
      <div>
        <label htmlFor="Title"></label>
        <input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.onTitleChange(target.value)}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <div>
        <label htmlFor="Description"></label>
        <input
          id="Description"
          placeholder="Description"
          type="text"
          value={props.description}
          name="Description"
          onChange={({ target }) => props.onDescriptionChange(target.value)}
          className="textarea textarea-ghost w-full max-w-xs h-24"
        />
      </div>
      <div>
        <DueDate dueDate={props.dueDate} onDueDate={props.onDueDate} />
      </div>
      <div>
        <div className="dropdown dropdown-hover">
          <label tabIndex="0" className="btn m-1">
            {selectedProject || "Click"}
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {projects}
          </ul>
        </div>
      </div>
      <Button
        className={
          props.title && props.projectId ? "btn" : "btn btn-disabled opacity-50"
        }
        type="submit"
        text="add"
      />
      <Button text="cancel" onClick={props.cancel} />
      {/* <button
        className={
          props.title && props.projectId ? "btn" : "btn btn-disabled opacity-50"
        }
        type="submit"
      >
        add
      </button>
      <button className="btn" onClick={(e) => props.cancel(e)}>
        cancel
      </button> */}
    </form>
  );
};

export default CreateTaskForm;

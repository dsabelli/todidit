import { useState } from "react";
import DueDate from "./DueDate";
import Button from "./Button";
import Input from "./Input";

const CreateTaskForm = ({
  onTaskCreation,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  dueDate,
  onDueDate,
  projects,
  projectId,
  onProjectId,
  cancel,
}) => {
  const [selectedProject, setSelectedProject] = useState("");

  const projectElements = projects.map((project) =>
    !project.isArchived ? (
      <li key={project.id} onClick={() => setSelectedProject(project.title)}>
        <a onClick={() => onProjectId(project.id)}>{project.title}</a>
      </li>
    ) : (
      ""
    )
  );

  return (
    <form onSubmit={(e) => onTaskCreation(e)}>
      <div>
        <label htmlFor="Title"></label>
        <Input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => onTitleChange(target.value)}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <div>
        <label htmlFor="Description"></label>
        <Input
          id="Description"
          placeholder="Description"
          type="text"
          value={description}
          name="Description"
          onChange={({ target }) => onDescriptionChange(target.value)}
          className="textarea textarea-ghost w-full max-w-xs h-24"
        />
      </div>
      <div>
        <DueDate dueDate={dueDate} onDueDate={onDueDate} />
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
            {projectElements}
          </ul>
        </div>
      </div>
      <Button
        className={title && projectId ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
        text="add"
      />
      <Button text="cancel" onClick={cancel} />
    </form>
  );
};

export default CreateTaskForm;

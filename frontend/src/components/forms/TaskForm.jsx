import { useState } from "react";
import DueDate from "../../features/Tasks/DueDate";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";

const TaskForm = ({
  onSubmit,
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange,
  dueDate,
  onDueDate,
  projects,
  projectTitle,
  projectId,
  onProjectId,
  onClick,
  submitText,
}) => {
  const [selectedProject, setSelectedProject] = useState("");

  const projectElements = projects.map((project) =>
    !project.isArchived ? (
      <li key={project.id} onClick={() => setSelectedProject(project.title)}>
        <a onClick={() => onProjectId(project.id)}>{project.title}</a>
      </li>
    ) : null
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="Title"></label>
        <Input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={titleValue}
          name="Title"
          onChange={onTitleChange}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <div>
        <label htmlFor="Description"></label>
        <Textarea
          id="Description"
          placeholder="Description"
          type="text"
          value={descriptionValue}
          name="Description"
          onChange={onDescriptionChange}
          className="textarea textarea-ghost w-full max-w-xs h-24"
        />
      </div>
      <div>
        <DueDate dueDate={dueDate} onDueDate={onDueDate} />
      </div>
      <div>
        <div className="dropdown dropdown-hover">
          <label tabIndex="0" className="btn m-1">
            {selectedProject || projectTitle || "Select"}
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
        className={
          (titleValue && projectTitle) || (titleValue && projectId)
            ? "btn"
            : "btn btn-disabled opacity-50"
        }
        type="submit"
        text={submitText}
      />
      <Button text="cancel" onClick={onClick} />
    </form>
  );
};

export default TaskForm;

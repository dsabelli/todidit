import { useState } from "react";
import DueDate from "../../features/Tasks/DueDate";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
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
  tasks,
}) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projectElements = projects.map((project) =>
    !project.isArchived ? (
      <li key={project.id} onClick={() => setSelectedProject(project.title)}>
        <a onClick={() => onProjectId(project.id)}>{project.title}</a>
      </li>
    ) : null
  );

  const projectTaskLength = tasks.filter(
    (task) =>
      (task.project === projectId && !task.isArchived) || !task.isArchived
  ).length;

  return (
    <div className="pl-2 mx-auto w-full max-w-3xl">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="border border-accent rounded-lg mt-2 p-2">
          <div>
            <label htmlFor="Title"></label>
            <Input
              tabIndex="0"
              autoFocus
              placeholder="e.g., task here"
              id="Title"
              type="text"
              value={titleValue}
              name="Title"
              onChange={onTitleChange}
              className="input p-0 w-full text-xl focus:outline-none placeholder-opacity-50"
              onKeyDown={(e) =>
                e.key === "Escape"
                  ? onClick()
                  : titleValue && e.key === "Enter"
                  ? onSubmit(e)
                  : null
              }
            />
          </div>
          <div className="">
            <label htmlFor="Description"></label>
            <Textarea
              id="Description"
              placeholder="Description"
              type="text"
              value={descriptionValue}
              name="Description"
              onChange={onDescriptionChange}
              className="textarea resize-none w-full p-0 min-h-12 leading-4 focus:outline-none placeholder-opacity-50"
              onKeyDown={(e) => (e.key === "Escape" ? onClick() : null)}
            />
          </div>
          <div className="flex justify-between mt-2">
            <DueDate
              dueDate={dueDate}
              onDueDate={onDueDate}
              className={`font-bold md:dropdown-hover ${
                projectTaskLength >= 6 ? "dropdown-top" : ""
              }`}
            />
            <Dropdown
              className={`md:dropdown-hover dropdown-end  font-bold ${
                projectTaskLength >= 6 ? "dropdown-top" : ""
              }`}
              text={selectedProject || projectTitle || "Select a project"}
            >
              {projectElements}
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-end gap-2 my-2">
          <Button className={"btn-sm "} text="cancel" onClick={onClick} />
          <Button
            className={`btn-sm btn-accent text-accent-content ${
              (titleValue && projectTitle) || (titleValue && projectId)
                ? ""
                : "btn-disabled opacity-50"
            }`}
            type="submit"
            text={submitText}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

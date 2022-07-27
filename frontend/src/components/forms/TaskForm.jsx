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
    <div className="pl-2 mx-auto w-full max-w-3xl">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="border border-accent rounded-lg mt-2 p-2">
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
              className="input   p-0 w-full text-xl focus:outline-none "
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
              className="textarea resize-none w-full p-0 min-h-12 leading-4 focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-2">
            <DueDate dueDate={dueDate} onDueDate={onDueDate} className="" />
            <Dropdown
              className={"dropdown-hover dropdown-end"}
              text={projectTitle || selectedProject || "Select a project"}
            >
              {projectElements}
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-end gap-2 my-2">
          <Button className={"btn-sm"} text="cancel" onClick={onClick} />
          <Button
            className={`btn-sm  ${
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

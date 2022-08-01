import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import DeleteIcon from "../../Assets/Icons/DeleteIcon";
import EditIcon from "../../Assets/Icons/EditIcon";
import StarIcon from "../../Assets/Icons/StarIcon";
import DueOn from "./DueOn";

const Task = ({
  dueDate,
  completedOn,
  checked,
  important,
  id,
  onCheck,
  onUpdate,
  onImportant,
  onDelete,
  title,
  description,
  projects,
  project,
}) => {
  return (
    <div className="flex p-1 gap-2 justify-center mx-auto max-w-3xl">
      <Checkbox
        checked={checked}
        onChange={() => onCheck(id)}
        id="checkbox"
        name="checkbox"
        className={"px-0.5 py-1.5"}
      />
      <div className="flex-col w-full  ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-3 items-center">
            <div
              className={`text-xl flex flex-col items-start ${
                checked ? "line-through" : ""
              }`}
            >
              {title}
            </div>
          </div>
          <div className="flex gap-1 ">
            <Button
              className={
                "btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-200"
              }
              onClick={() => {
                onImportant(id);
              }}
            >
              <StarIcon
                className={`w-6 h-6 hover:text-warning ${
                  important ? "text-warning" : ""
                }`}
              />
            </Button>
            <Button
              className={
                "btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-200"
              }
              onClick={() => {
                onUpdate(id);
              }}
            >
              <EditIcon className={"w-6 h-6 hover:text-info"} />
            </Button>
            <Button
              className={`btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-200 ${
                checked ? "" : "hidden"
              }`}
              onClick={() => {
                onDelete();
              }}
            >
              <DeleteIcon className={"w-6 hover:text-error"} />
            </Button>
          </div>
        </div>
        <div className="text-left">
          <div
            className={`text-sm mb-0.5 flex flex-col items-start whitespace-pre-line  ${
              checked ? "line-through" : ""
            }`}
          >
            {description}
          </div>
          <div className="flex justify-between mt-1 pr-1 border-b border-neutral">
            <DueOn
              className={`text-xs flex flex-col items-start pb-2 ${
                checked ? "line-through" : ""
              }`}
              completedOn={completedOn}
              dueDate={dueDate}
            />
            <div className="text-xs">
              {projects.find((proj) => proj.id === project).title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

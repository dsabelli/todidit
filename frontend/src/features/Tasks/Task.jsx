import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import DeleteIcon from "../../Assets/DeleteIcon";
import EditIcon from "../../Assets/EditIcon";
import StarIcon from "../../Assets/StarIcon";
import DueOn from "./DueOn";
const Task = ({
  dueDate,
  completedOn,
  checked,
  id,
  onCheck,
  onUpdate,
  onDelete,
  title,
  description,
}) => {
  return (
    <div className="flex p-1 gap-2 justify-center">
      <Checkbox
        checked={checked}
        onChange={() => onCheck(id)}
        id="checkbox"
        name="checkbox"
        className={"py-1.5"}
      />
      <div className="flex-col w-full max-w-2xl ">
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
                "btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-300"
              }
              onClick={() => {
                onUpdate(id);
              }}
            >
              <StarIcon className={"w-6 h-6 hover:text-warning"} />
            </Button>
            <Button
              className={
                "btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-300"
              }
              onClick={() => {
                onUpdate(id);
              }}
            >
              <EditIcon className={"w-6 h-6 hover:text-primary"} />
            </Button>
            <Button
              className={`btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-300 ${
                checked ? "" : "btn-disabled opacity-50"
              }`}
              onClick={() => {
                onDelete();
              }}
              text={<DeleteIcon className={"w-6 hover:text-error"} />}
            />
          </div>
        </div>
        <div className="text-left">
          <div
            className={`text-sm mb-0.5 flex flex-col items-start ${
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
            <div className="text-xs">{"task project"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

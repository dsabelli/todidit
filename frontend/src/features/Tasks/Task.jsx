import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import DeleteIcon from "../../Assets/DeleteIcon";
import EditIcon from "../../Assets/EditIcon";
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
    <div className="flex ">
      <Checkbox
        checked={checked}
        onChange={() => onCheck(id)}
        id="checkbox"
        name="checkbox"
        className={"py-1"}
      />
      <div className="flex-col w-full max-w-2xl px-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div
              className={`flex flex-col items-start ${
                checked ? "line-through" : ""
              }`}
            >
              {title}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              className={"btn-xs"}
              onClick={() => {
                onUpdate(id);
              }}
              text={"edit"}
            />
            <Button
              className={`btn-xs  btn-square ${
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
            className={`text-xs flex flex-col items-start ${
              checked ? "line-through" : ""
            }`}
          >
            {description}
          </div>
          <div className="flex justify-between pr-10">
            <DueOn
              className={`text-xs flex flex-col items-start ${
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

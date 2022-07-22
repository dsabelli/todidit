import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import DeleteSvg from "../../Assets/DeleteSvg";
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
    <div className="flex justify-between px-4 items-center">
      <div className="flex gap-3 items-center ">
        <div>
          <Checkbox
            checked={checked}
            onChange={() => onCheck(id)}
            id="checkbox"
            name="checkbox"
          />
        </div>
        <div
          className={`flex flex-col items-start ${
            checked ? "line-through" : ""
          }`}
        >
          <div className="">{title}</div>
          <div className="text-xs mb-5 ">{description}</div>
          <DueOn completedOn={completedOn} dueDate={dueDate} />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            onUpdate(id);
          }}
          text="edit"
        />
        <Button
          className={` btn-square ${checked ? "" : "btn-disabled opacity-50"}`}
          onClick={() => {
            onDelete();
          }}
          text={<DeleteSvg className={"w-6 hover:text-error"} />}
        />
      </div>
    </div>
  );
};

export default Task;

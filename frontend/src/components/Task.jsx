import { format, parseJSON } from "date-fns";
import Button from "./Button";
import Checkbox from "./Checkbox";

const Task = ({
  dueDate,
  checked,
  id,
  onCheck,
  onUpdate,
  onDelete,
  title,
  description,
}) => {
  const dateDue = format(parseJSON(dueDate), "dd-MM-yyyy");

  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
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
          <div className="text-xs mb-5 ">
            {dateDue === format(new Date(), "dd-MM-yyyy") ? (
              <span className="bg-red-500">Today</span>
            ) : (
              dateDue
            )}
          </div>
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
          className={`btn btn-square ${
            checked ? "" : "btn-disabled opacity-50"
          }`}
          onClick={() => {
            onDelete(id);
          }}
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
      </div>
    </div>
  );
};

export default Task;

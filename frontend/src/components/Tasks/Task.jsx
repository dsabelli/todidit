import { useContext } from "react";
import {
  format,
  parseJSON,
  isPast,
  parseISO,
  differenceInCalendarDays,
} from "date-fns";
import { DateFormatContext } from "../context/DateFormatContext";
import Button from "../UI/Button";
import Checkbox from "../UI/Checkbox";
import DeleteSvg from "../svg/DeleteSvg";

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
  const { dateFormat } = useContext(DateFormatContext);
  const dateDue = format(parseJSON(dueDate), dateFormat);
  let difference;
  return (
    <div className="flex justify-between px-4 ">
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
            {dateDue === format(new Date(), "MMM-dd-yyyy") ? (
              <span className="bg-yellow-500">Today</span>
            ) : isPast(parseISO(dueDate)) ? (
              <span className="bg-red-500">
                Overdue by{" "}
                {
                  (difference = differenceInCalendarDays(
                    new Date(),
                    parseISO(dueDate)
                  ))
                }{" "}
                {difference === 1 ? "day" : "days"}
              </span>
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
            onDelete();
          }}
          text={<DeleteSvg />}
        />
      </div>
    </div>
  );
};

export default Task;

import { useContext } from "react";
import {
  format,
  parseJSON,
  isPast,
  parseISO,
  differenceInCalendarDays,
} from "date-fns";
import { DateFormatContext } from "../../context/DateFormatContext";
import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import DeleteSvg from "../../Assets/DeleteSvg";

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
            {completedOn ? (
              <span className="text-success">
                {format(parseJSON(completedOn), dateFormat)}
              </span>
            ) : dateDue === format(new Date(), dateFormat) ? (
              <span className="text-warning">Today</span>
            ) : isPast(parseISO(dueDate)) ? (
              <span className="text-error">
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

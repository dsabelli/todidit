import { useContext } from "react";
import {
  format,
  parseJSON,
  isPast,
  differenceInCalendarDays,
  isTomorrow,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isThisWeek,
  addDays,
} from "date-fns";
import { DateFormatContext } from "../../context/DateFormatContext";
import { useParams } from "react-router-dom";

const DueOn = ({ completedOn, dueDate, className }) => {
  let params = useParams();
  const timeMachineDate = params.date ? parseJSON(params.date) : "";
  const { dateFormat } = useContext(DateFormatContext);
  const parsedDueDate = parseJSON(dueDate);
  const formatedDate = format(parsedDueDate, dateFormat);

  let difference;

  const getDifference = (parsedDueDate, completedOn) => {
    let day;
    switch (true) {
      case completedOn ? true : false:
        day = (
          <span className="text-success font-bold">
            {format(parseJSON(completedOn), dateFormat)}
          </span>
        );
        break;
      case format(parsedDueDate, dateFormat) ===
      format(params.date ? timeMachineDate : new Date(), dateFormat)
        ? true
        : false:
        day = <span className="text-warning font-bold">Today</span>;
        break;
      case format(parsedDueDate, dateFormat) ===
      format(
        params.date ? addDays(timeMachineDate, 1) : addDays(new Date(), 1),
        dateFormat
      )
        ? true
        : false:
        day = <span className="text-secondary-focus font-bold">Tomorrow</span>;
        break;
      case timeMachineDate > parsedDueDate:
        difference = differenceInCalendarDays(timeMachineDate, parsedDueDate);
        day = (
          <span className="text-error font-bold">
            Overdue by {difference} {difference === 1 ? "day" : "days"}
          </span>
        );
        break;
      case timeMachineDate && timeMachineDate < parsedDueDate:
        day = formatedDate;
        break;
      case isPast(parsedDueDate):
        difference = differenceInCalendarDays(new Date(), parsedDueDate);
        day = (
          <span className="text-error font-bold">
            Overdue by {difference} {difference === 1 ? "day" : "days"}
          </span>
        );
        break;
      case isThisWeek(parsedDueDate, { weekStartsOn: 1 }) &&
        isMonday(parsedDueDate):
        day = <span className="text-accent-focus font-bold">Monday</span>;
        break;
      case isThisWeek(parsedDueDate, { weekStartsOn: 1 }) &&
        isTuesday(parsedDueDate):
        day = <span className="text-accent-focus font-bold">Tueday</span>;
        break;
      case isThisWeek(parsedDueDate, { weekStartsOn: 1 }) &&
        isWednesday(parsedDueDate):
        day = <span className="text-accent-focus font-bold">Wednesday</span>;
        break;
      case isThisWeek(parsedDueDate, { weekStartsOn: 1 }) &&
        isThursday(parsedDueDate):
        day = <span className="text-accent-focus font-bold">Thursday</span>;
        break;
      case isThisWeek(parsedDueDate, { weekStartsOn: 1 }) &&
        isFriday(parsedDueDate):
        day = <span className="text-accent-focus font-bold">Friday</span>;
        break;

      default:
        day = formatedDate;
    }

    return day;
  };

  return (
    <div className={` ${className}`}>
      {getDifference(parsedDueDate, completedOn)}
    </div>
  );
};

export default DueOn;

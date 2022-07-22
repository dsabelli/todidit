import { useContext } from "react";
import { format, parseJSON, isPast, differenceInCalendarDays } from "date-fns";
import { DateFormatContext } from "../../context/DateFormatContext";

const DueOn = ({ completedOn, dueDate }) => {
  const { dateFormat } = useContext(DateFormatContext);
  const dateDue = format(parseJSON(dueDate), dateFormat);
  let difference;
  return (
    <div className="text-xs mb-5 ">
      {completedOn ? (
        <span className="text-success">
          {format(parseJSON(completedOn), dateFormat)}
        </span>
      ) : dateDue === format(new Date(), dateFormat) ? (
        <span className="text-warning">Today</span>
      ) : isPast(parseJSON(dueDate)) ? (
        <span className="text-error">
          Overdue by{" "}
          {
            (difference = differenceInCalendarDays(
              new Date(),
              parseJSON(dueDate)
            ))
          }{" "}
          {difference === 1 ? "day" : "days"}
        </span>
      ) : (
        dateDue
      )}
    </div>
  );
};

export default DueOn;

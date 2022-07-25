import { useContext } from "react";
import { format } from "date-fns";
import { DateFormatContext } from "../../context/DateFormatContext";

const Didit = ({
  title,
  description,
  createdOn,
  dueOn,
  completedOn,
  project,
}) => {
  const { dateFormat } = useContext(DateFormatContext);
  // console.log(format(createdOn, dateFormat));

  return (
    <div className="flex flex-col items-start gap-1 mb-5 opacity-60">
      <div className="text-lg">{title}</div>
      <div className="text-sm whitespace-pre-line ">{description}</div>
      {createdOn && (
        <div className="text-xs">
          Created on: {format(createdOn, dateFormat)}
        </div>
      )}
      {dueOn && (
        <div className="text-xs">Due on: {format(dueOn, dateFormat)}</div>
      )}

      <div className="text-xs">
        Completed on: {format(completedOn, dateFormat)}
      </div>
      <div className="text-xs">Project: {project}</div>
    </div>
  );
};

export default Didit;

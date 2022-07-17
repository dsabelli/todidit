import { useContext } from "react";
import { format } from "date-fns";
import { DateFormatContext } from "../context/DateFormatContext";

const Didit = ({ title, completedOn, project }) => {
  const { dateFormat } = useContext(DateFormatContext);
  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
        <div className="">{title}</div>
        <div className="text-xs mb-5 ">{format(completedOn, dateFormat)}</div>
        <div className="text-xs mb-5 ">{project}</div>
      </div>
    </div>
  );
};

export default Didit;

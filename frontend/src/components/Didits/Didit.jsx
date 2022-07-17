import { format } from "date-fns";

const Didit = ({ title, completedOn, project }) => {
  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
        <div className="">{title}</div>
        <div className="text-xs mb-5 ">
          {format(completedOn, "MMM-dd-yyyy")}
        </div>
        <div className="text-xs mb-5 ">{project}</div>
      </div>
    </div>
  );
};

export default Didit;

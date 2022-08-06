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

  return (
    <div className="flex p-1 gap-2 justify-center mx-auto max-w-3xl opacity-60 mb-2">
      <div className="flex-col w-full  ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-3 items-center">
            <div className={`text-xl flex flex-col items-start mb-2`}>
              {title}
            </div>
          </div>
        </div>
        <div className="text-left">
          <div
            className={`text-sm mb-4 flex flex-col items-start whitespace-pre-line `}
          >
            {description}
          </div>
          <div className="flex justify-between pr-1 border-b border-neutral">
            <div className="flex flex-col gap-1 mb-2">
              {createdOn && (
                <div className="text-xs">
                  Created on: {format(createdOn, dateFormat)}
                </div>
              )}
              {dueOn && (
                <div className="text-xs">
                  Due on: {format(dueOn, dateFormat)}
                </div>
              )}

              <div className="text-xs">
                Completed on: {format(completedOn, dateFormat)}
              </div>
            </div>
            <div className="text-xs self-end mb-2">Project: {project}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Didit;

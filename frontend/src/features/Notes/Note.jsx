import { format, parseJSON } from "date-fns";
import { useContext } from "react";
import DeleteIcon from "../../Assets/Icons/DeleteIcon";
import EditIcon from "../../Assets/Icons/EditIcon";
import Button from "../../components/UI/Button";
import { DateFormatContext } from "../../context/DateFormatContext";

const Note = ({
  checked,
  id,
  onUpdate,
  onDelete,
  title,
  description,
  createdOn,
  hidden,
}) => {
  const { dateFormat } = useContext(DateFormatContext);
  return (
    <div
      className={`flex p-1 gap-2 justify-center mx-auto max-w-3xl ${
        hidden ? "pl-8" : ""
      }`}
    >
      <div className="flex-col w-full  ">
        <div className="flex items-center justify-between ">
          <div className="flex gap-3 items-center">
            <div
              className={` text-lg md:text-xl flex flex-col items-start ${
                checked ? "line-through" : ""
              }`}
            >
              {title}
            </div>
          </div>
          <div className="flex gap-1 ">
            <Button
              className={`btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-200 ${
                hidden ? "hidden" : ""
              }`}
              onClick={() => {
                onUpdate(id);
              }}
            >
              <EditIcon className={"w-6 h-6 hover:text-info"} />
            </Button>
            <Button
              className={`btn-xs w-7 h-7 p-1 bg-transparent border-none hover:bg-base-200 ${
                hidden ? "hidden" : ""
              }`}
              onClick={() => {
                onDelete(id);
              }}
            >
              <DeleteIcon className={"w-6 hover:text-error"} />
            </Button>
          </div>
        </div>
        <div className="text-left">
          <div
            className={`text-sm mb-0.5 flex flex-col items-start whitespace-pre-line`}
          >
            {description}
          </div>
        </div>
        <div className="flex justify-between pr-1 border-b border-neutral">
          <div className="flex flex-col gap-1 mb-2">
            {createdOn && (
              <div className="text-xs">
                Created on: {format(parseJSON(createdOn), dateFormat)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 mb-2">
            {createdOn && (
              <div className={`text-xs ${hidden ? "" : "hidden"}`}>Notes</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

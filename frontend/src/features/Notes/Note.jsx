import EditIcon from "../../Assets/Icons/EditIcon";
import Button from "../../components/UI/Button";

const Note = ({
  dueDate,
  completedOn,
  checked,
  important,
  id,
  onCheck,
  onUpdate,
  onImportant,
  onDelete,
  title,
  description,
  projects,
  project,
  disabled,
  hidden,
}) => {
  return (
    <div className="flex p-1 gap-2 justify-center mx-auto max-w-3xl">
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
          </div>
        </div>
        <div className="text-left">
          <div
            className={`text-sm mb-0.5 flex flex-col items-start whitespace-pre-line`}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

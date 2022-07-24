import Button from "../../components/UI/Button";
import EditIcon from "../../Assets/EditIcon";
import DeleteIcon from "../../Assets/DeleteIcon";
import { Link } from "react-router-dom";

const Project = ({ id, onUpdate, onDelete, title }) => {
  return (
    <ul className="menu text-base pl-3 ">
      <li className="">
        <Link to={`project/${id}`}>
          <div className="p-0 flex justify-between w-full">
            <div className="">{title}</div>
            <div className="flex ">
              <Button
                className={
                  "btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-300"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onUpdate(id);
                }}
              >
                <EditIcon className={"w-6 h-6 hover:text-primary"} />
              </Button>
              <Button
                className={`btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete();
                }}
              >
                <DeleteIcon className={"w-6 hover:text-error"} />
              </Button>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Project;

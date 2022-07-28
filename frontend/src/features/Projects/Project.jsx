import Button from "../../components/UI/Button";
import EditIcon from "../../Assets/Icons/EditIcon";
import DeleteIcon from "../../Assets/Icons/DeleteIcon";
import { Link, useParams } from "react-router-dom";

const Project = ({ id, onUpdate, onDelete, title, tasks }) => {
  let params = useParams();
  const pId = params.id;
  const projectTasks = tasks.filter(
    (task) => task.project === id && !task.isChecked
  ).length;

  return (
    <ul className="menu text-base pl-3 ">
      <li className={` ${pId === id ? "bordered" : "pl-1"}`}>
        <Link to={`project/${id}`}>
          <div className="p-0 flex justify-between w-full group ">
            <div className="">{title}</div>
            <div className="flex">
              <Button
                className={
                  "btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-200 hidden group-hover:flex"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onUpdate(id);
                }}
              >
                <EditIcon className={"w-6 h-6 hover:text-info"} />
              </Button>
              <Button
                className={`btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-200 hidden group-hover:flex`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete();
                }}
              >
                <DeleteIcon className={"w-6 hover:text-error"} />
              </Button>
              <div className="flex justify-between w-full items-center group-hover:hidden">
                <p className="badge  text-right">{projectTasks}</p>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Project;

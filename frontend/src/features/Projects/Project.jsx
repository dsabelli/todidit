import Button from "../../components/UI/Button";
import EditIcon from "../../Assets/Icons/EditIcon";
import DeleteIcon from "../../Assets/Icons/DeleteIcon";
import { Link, useParams } from "react-router-dom";
import Modal from "../../components/UI/Modal";
import ErrorIcon from "../../Assets/Icons/ErrorIcon";
import DeleteAlert from "../../layouts/DeleteAlert";

const Project = ({ id, onUpdate, onDelete, title, tasks }) => {
  let params = useParams();
  const pId = params.id;
  const projectTasks = tasks.filter(
    (task) => task.project === id && !task.isChecked
  ).length;

  return (
    <ul className="menu text-base pl-3 ">
      <li className={` ${pId === id ? "bordered" : "pl-1"}`}>
        <div className="flex justify-between w-full group ">
          <div className="w-full">
            <Link to={`project/${id}`}>
              <p>{title}</p>
            </Link>
          </div>
          <div className="flex gap-0.5">
            <Button
              className={
                "btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-200 hidden group-hover:flex"
              }
              onClick={() => {
                onUpdate(id);
              }}
            >
              <EditIcon className={"w-6 h-6 hover:text-info"} />
            </Button>
            <DeleteAlert
              modalId="Project"
              openButton={<DeleteIcon className="w-6 hover:text-error" />}
              openButtonClass="btn-xs w-6 h-6 p-1 bg-transparent border-none hover:bg-base-200 hidden group-hover:flex"
              modalTitle={`project ${title}`}
              modalIcon={<ErrorIcon className="w-24 mx-auto my-8" />}
              onClick={() => onDelete()}
            />
            <div className="flex justify-between w-full items-center group-hover:hidden">
              <p className="badge text-right">{projectTasks}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Project;

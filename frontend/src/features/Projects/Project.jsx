import Button from "../../components/UI/Button";
import DeleteSvg from "../../Assets/DeleteSvg";
import { Link } from "react-router-dom";

const Project = ({ id, onUpdate, onDelete, title }) => {
  return (
    <div className="flex justify-between  ">
      <Link to={`project/${id}`}>
        <div className="">{title}</div>
      </Link>

      <div className="flex gap-4">
        <Button
          onClick={() => {
            onUpdate(id);
          }}
          text="edit"
        />
        <Button
          className={`btn btn-square `}
          onClick={() => {
            onDelete();
          }}
          text={<DeleteSvg />}
        />
      </div>
    </div>
  );
};

export default Project;

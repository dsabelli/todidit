import Button from "../UI/Button";
import DeleteSvg from "../svg/DeleteSvg";

const Project = ({ id, onUpdate, onDelete, title }) => {
  return (
    <div className="flex justify-between  ">
      <button onClick={() => console.log(id)}>
        <div className="">{title}</div>
      </button>

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

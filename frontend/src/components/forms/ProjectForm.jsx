import Button from "../UI/Button";
import Input from "../UI/Input";

const ProjectForm = ({ onSubmit, value, onChange, onClick, submitText }) => {
  return (
    <div className="pl-4">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="border border-accent rounded-lg mt-1 px-2">
          <label htmlFor="Title"></label>
          <Input
            autoFocus
            placeholder="project name"
            id="Title"
            type="text"
            value={value}
            name="Title"
            onChange={onChange}
            className="input p-0 w-full text-base focus:outline-none bg-base-300 "
            onKeyDown={(e) =>
              e.key === "Escape"
                ? onClick()
                : value && e.key === "Enter"
                ? onSubmit(e)
                : null
            }
          />
        </div>
        <div className="flex justify-end gap-2 my-2">
          <Button className={"btn-xs"} text="cancel" onClick={onClick} />
          <Button
            className={`btn-xs ${value ? "" : " btn-disabled opacity-50"}`}
            type="submit"
            text={submitText}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

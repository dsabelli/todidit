import { useRef, useEffect } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const ProjectForm = ({ onSubmit, value, onChange, onClick, submitText }) => {
  const projectInput = useRef(null);
  //fix for focusing input
  useEffect(() => {
    if (projectInput.current) projectInput.current.focus();
  }, []);

  return (
    <div className="pl-4">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="border border-accent rounded-lg mt-1 px-2">
          <label ref={projectInput} htmlFor="Title"></label>
          <Input
            tabIndex="0"
            placeholder="Project name..."
            id="Title"
            type="text"
            value={value}
            name="Title"
            onChange={onChange}
            className="input p-0 w-full text-base focus:outline-none bg-transparent  placeholder-opacity-50 "
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
            className={`btn-xs btn-accent text-accent-content ${
              value ? "" : " btn-disabled opacity-50"
            }`}
            type="submit"
            text={submitText}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

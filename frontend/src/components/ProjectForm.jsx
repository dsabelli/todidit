import Button from "./Button";
import Input from "./Input";

const ProjectForm = ({ onSubmit, value, onChange, onClick }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="Title"></label>
        <Input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={value}
          name="Title"
          onChange={onChange}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <Button
        className={value ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
        text={"add"}
      />
      <Button onClick={onClick} text={"cancel"} />
    </form>
  );
};

export default ProjectForm;

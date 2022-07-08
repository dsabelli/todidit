import Button from "./Button";
import Input from "./Input";

const CreateProjectForm = ({
  onProjectCreation,
  title,
  onTitleChange,
  cancel,
}) => {
  return (
    <form onSubmit={(e) => onProjectCreation(e)}>
      <div>
        <label htmlFor="Title"></label>
        <Input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => onTitleChange(target.value)}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <Button
        className={title ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
        text={"add"}
      />
      <Button onClick={cancel} text={"cancel"} />
    </form>
  );
};

export default CreateProjectForm;

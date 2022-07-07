import Button from "./Button";
const CreateProjectForm = (props) => {
  return (
    <form onSubmit={(e) => props.onProjectCreation(e)}>
      <div>
        <label htmlFor="Title"></label>
        <input
          autoFocus
          placeholder="e.g., style this project better"
          id="Title"
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.onTitleChange(target.value)}
          className="input input-ghost w-full max-w-xs"
        />
      </div>
      <Button
        className={props.title ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
        text={"add"}
      />
      <Button onClick={props.cancel} text={"cancel"} />
    </form>
  );
};

export default CreateProjectForm;

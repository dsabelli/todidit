const UpdateProjectForm = (props) => {
  return (
    <form onSubmit={(e) => props.onProjectUpdate(e, props.id)}>
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

      <button
        className={props.title ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
      >
        save
      </button>
      <button className="btn" onClick={(e) => props.cancel(e)}>
        cancel
      </button>
    </form>
  );
};

export default UpdateProjectForm;

const CreateTaskForm = (props) => {
  return (
    <form onSubmit={(e) => props.onTaskCreation(e)}>
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
      <div>
        <label htmlFor="Description"></label>
        <input
          id="Description"
          placeholder="Description"
          type="text"
          value={props.description}
          name="Description"
          onChange={({ target }) => props.onDescriptionChange(target.value)}
          className="textarea textarea-ghost w-full max-w-xs h-24"
        />
      </div>
      <button
        className={props.title ? "btn" : "btn btn-disabled opacity-50"}
        type="submit"
      >
        add
      </button>
      <button className="btn" onClick={(e) => props.cancel(e)}>
        cancel
      </button>
    </form>
  );
};

export default CreateTaskForm;

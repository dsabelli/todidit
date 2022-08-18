import Button from "../UI/Button";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";

const NoteForm = ({
  onSubmit,
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange,
  onClick,
  submitText,
}) => {
  return (
    <div className="pl-2 mx-auto w-full max-w-3xl">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="border border-accent rounded-lg mt-2 p-2">
          <div>
            <label htmlFor="Title"></label>
            <Input
              tabIndex="0"
              autoFocus
              placeholder="e.g., note here"
              id="Title"
              type="text"
              value={titleValue}
              name="Title"
              onChange={onTitleChange}
              className="input p-0 w-full text-xl focus:outline-none placeholder-opacity-50"
              onKeyDown={(e) =>
                e.key === "Escape"
                  ? onClick()
                  : titleValue && e.key === "Enter"
                  ? onSubmit(e)
                  : null
              }
            />
          </div>
          <div className="">
            <label htmlFor="Description"></label>
            <Textarea
              id="Description"
              placeholder="Description"
              type="text"
              value={descriptionValue}
              name="Description"
              onChange={onDescriptionChange}
              className="textarea resize-none w-full p-0 min-h-12 leading-4 focus:outline-none placeholder-opacity-50"
              onKeyDown={(e) => (e.key === "Escape" ? onClick() : null)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 my-2">
          <Button className={"btn-sm "} text="cancel" onClick={onClick} />
          <Button
            className={`btn-sm btn-accent text-accent-content `}
            type="submit"
            text={submitText}
          />
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

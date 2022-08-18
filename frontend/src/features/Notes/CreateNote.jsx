import { useState } from "react";
import AddIcon from "../../Assets/Icons/AddIcon";
import NoteForm from "../../components/forms/NoteForm";
import noteService from "../../services/notes";
const CreateNote = ({
  user,
  notes,
  onNotes,
  addTask,
  onAddTask,
  onSystemMessage,
}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  //function to show create note form
  const showCreateNoteForm = () => {
    setNoteTitle("");
    setNoteDescription("");
    onAddTask((prevVal) => !prevVal);
    onNotes((prevNotes) =>
      prevNotes.map((note) => ({ ...note, isEditing: false }))
    );
  };

  //function to hide create note form
  const hideCreateNoteForm = () => {
    onAddTask((prevVal) => !prevVal);
    setNoteTitle("");
    setNoteDescription("");
  };

  //function to create notes from submission of form event
  //posts to db with helper function and adds new note to UI
  const handleCreateNote = async (e) => {
    try {
      e.preventDefault();
      const newNote = await noteService.createNotes(
        {
          title: noteTitle,
          description: noteDescription,
          isEditing: false,
        },
        user
      );
      setNoteTitle("");
      setNoteDescription("");
      onNotes((prevNotes) => prevNotes.concat(newNote));
      showCreateNoteForm();
    } catch (error) {
      onSystemMessage("System encountered an error.");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {addTask ? (
        <NoteForm
          onSubmit={(e) => handleCreateNote(e)}
          titleValue={noteTitle}
          descriptionValue={noteDescription}
          onTitleChange={(e) => setNoteTitle(e.target.value)}
          onDescriptionChange={(e) => setNoteDescription(e.target.value)}
          onClick={hideCreateNoteForm}
          submitText="add"
          notes={notes}
        />
      ) : (
        <div
          onClick={() => showCreateNoteForm()}
          className="flex gap-1 mx-auto max-w-3xl py-2 pl-0.5 text-base items-center rounded-md hover:bg-base-200 cursor-pointer "
        >
          <AddIcon className="w-6 text-secondary" />
          <p>Add Note</p>
        </div>
      )}
    </>
  );
};

export default CreateNote;

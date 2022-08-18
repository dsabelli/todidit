import { useState } from "react";
import NoteForm from "../../components/forms/NoteForm";
import noteService from "../../services/notes";
import Note from "./Note";
const ReadAndUpdateNotes = ({
  user,
  notes,
  onNotes,
  onAddTask,
  onSystemMessage,
}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  //function to show note form for editing note inline, populates fields with current data
  //hides the current note being edited
  const showUpdateNoteForm = (id) => {
    onAddTask(false);
    setNoteTitle(notes.filter((note) => note.id === id)[0].title);
    setNoteDescription(notes.filter((note) => note.id === id)[0].description);
    onNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, isEditing: !note.isEditing }
          : { ...note, isEditing: false }
      )
    );
  };

  //function to hide note form for editing note
  //resets form fields on cancel
  const hideUpdateNoteForm = () => {
    setNoteTitle("");
    setNoteDescription("");
    onNotes((prevNotes) =>
      prevNotes.map((note) => ({ ...note, isEditing: false }))
    );
  };

  //function to update notes from submission of form event
  //puts to db with helper function and updates note in UI
  const handleUpdateNote = async (e, id) => {
    try {
      e.preventDefault();
      const notetoUpdate = notes.filter((note) => note.id === id)[0];

      const updatedNote = await noteService.updateNotes(
        {
          ...notetoUpdate,
          title: noteTitle,
          description: noteDescription,
          isEditing: false,
        },
        user
      );

      onNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...updatedNote } : note))
      );

      setNoteTitle("");
      setNoteDescription("");
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      const notetoUpdate = notes.filter((note) => note.id === id)[0];

      await noteService.updateNotes(
        {
          ...notetoUpdate,
          isArchived: true,
          completedOn: new Date(),
        },
        user
      );

      onNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      onSystemMessage("System encountered an error");
      console.log(error);
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  const noteElements =
    notes.length > 0 &&
    notes.map((note) =>
      note.isEditing ? (
        <NoteForm
          key={note.id}
          id={note.id}
          titleValue={noteTitle}
          descriptionValue={noteDescription || note.description}
          onSubmit={(e) => handleUpdateNote(e, note.id)}
          onTitleChange={(e) => setNoteTitle(e.target.value)}
          onDescriptionChange={(e) => setNoteDescription(e.target.value)}
          onClick={hideUpdateNoteForm}
          submitText="save"
          notes={notes}
        />
      ) : (
        <Note
          checked={note.isChecked}
          onUpdate={showUpdateNoteForm}
          onDelete={handleArchiveNote}
          title={note.title}
          description={note.description}
          key={note.id}
          id={note.id}
          createdOn={note.createdOn}
        />
      )
    );
  return <>{noteElements}</>;
};

export default ReadAndUpdateNotes;

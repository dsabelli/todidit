import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReadAndUpdateNotes from "../../features/Notes/ReadAndUpdateNotes";
const Notes = () => {
  const { user } = useContext(UserContext);
  const [
    tasks,
    setTasks,
    allTasks,
    setAllTasks,
    projects,
    setAddTask,
    projectTitle,
    setProjectTitle,
    projectId,
    setProjectId,
    setSystemMessage,
    notes,
    setNotes,
  ] = useOutletContext();

  return (
    <div>
      <ReadAndUpdateNotes
        user={user}
        notes={notes}
        onNotes={setNotes}
        onAddTask={setAddTask}
        onSystemMessage={setSystemMessage}
      />
    </div>
  );
};

export default Notes;

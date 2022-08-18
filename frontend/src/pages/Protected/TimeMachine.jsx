import { isBefore, isSameDay, parseJSON } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Note from "../../features/Notes/Note";
import Task from "../../features/Tasks/Task";
import noteService from "../../services/notes";

import { TimeMachineContext } from "../../context/TimeMachineContext";
import { UserContext } from "../../context/UserContext";
const TimeMachine = () => {
  let params = useParams();
  const parsedParamDate = parseJSON(params.date);
  const { user } = useContext(UserContext);
  const { timeMachineTasks } = useContext(TimeMachineContext);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  //filter out current tasks if the created date is before the "past" date
  //or if the task was completed today but not yet deleted
  useEffect(() => {
    setTasks(
      allTasks.filter(
        (task) =>
          isSameDay(parseJSON(task.createdOn), parsedParamDate) ||
          isBefore(parseJSON(task.createdOn), parsedParamDate) ||
          isSameDay(parseJSON(task.completedOn), parsedParamDate)
      )
    );
  }, [params.date]);

  //when the "past" date is selected and api responds with timeMachineTasks
  //set state of combined tasks with current filtered tasks and timeMachineTasks
  //set as one array to then sort before mapping into Task components
  useEffect(() => {
    setCombinedTasks(tasks.concat(timeMachineTasks));
  }, [timeMachineTasks]);

  //sort function to filter combinedTasks array
  const sortTasks = (a, b) => {
    return (parseJSON(a.dueDate) < parseJSON(b.dueDate) &&
      !isSameDay(parseJSON(a.completedOn), parsedParamDate)) ||
      isSameDay(parseJSON(b.completedOn), parsedParamDate)
      ? -1
      : 1;
  };

  //get archived notes for the selected day
  useEffect(() => {
    const getNotes = async () => {
      const response = await noteService.getTimeMachineNotes(
        parsedParamDate,
        user
      );
      setNotes(response);
    };
    getNotes();
  }, [params.date]);

  //map through combined, sorted array. If the task was completed on the "past" day,
  // set checked to true and completedOn to the completed on date
  //if not, set checked to false and completedOn to null
  const Els =
    combinedTasks.length > 0 &&
    combinedTasks
      .sort(sortTasks)
      .map((task) =>
        isSameDay(parseJSON(task.completedOn), parsedParamDate) ? (
          <Task
            disabled="disabled"
            hidden="hidden"
            checked={true}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            key={task.id}
            id={task.id}
            completedOn={task.completedOn}
            important={task.isImportant}
            project={task.project}
            projects={projects}
          />
        ) : (
          <Task
            disabled="disabled"
            hidden="hidden"
            checked={false}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            key={task.id}
            id={task.id}
            completedOn={null}
            important={task.isImportant}
            project={task.project}
            projects={projects}
          />
        )
      );
  const NoteEls =
    notes.length > 0 &&
    notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        description={note.description}
        createdOn={note.createdOn}
        hidden
      />
    ));
  return (
    <div className="opacity-60">
      {Els}
      {NoteEls || ""}
    </div>
  );
};

export default TimeMachine;

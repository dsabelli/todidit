import { useState, useEffect, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Task from "../../features/Tasks/Task";
import { isToday, parseJSON, isSameDay, isBefore } from "date-fns";

import { TimeMachineContext } from "../../context/TimeMachineContext";
const TimeMachine = () => {
  let params = useParams();
  const parsedParamDate = parseJSON(params.date);
  const { timeMachineTasks } = useContext(TimeMachineContext);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();
  const [combinedTasks, setCombinedTasks] = useState([]);

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

  return <div className="opacity-60">{Els}</div>;
};

export default TimeMachine;

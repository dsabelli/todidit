import { useEffect, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Task from "../../features/Tasks/Task";
import { isBefore, parseJSON, isSameDay } from "date-fns";

import { TimeMachineContext } from "../../context/TimeMachineContext";
const TimeMachine = () => {
  let params = useParams();
  const { user } = useContext(UserContext);
  const { timeMachineTasks } = useContext(TimeMachineContext);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();
  console.log(timeMachineTasks);
  useEffect(() => {
    setTasks(
      allTasks.filter(
        (task) =>
          isBefore(parseJSON(task.createdOn), parseJSON(params.date)) ||
          isSameDay(parseJSON(task.completedOn), parseJSON(params.date))
      )
    );
  }, [params.date]);

  const taskEls = tasks.map((task) => (
    <Task
      disabled="disabled"
      hidden="hidden"
      checked={task.isChecked}
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
  ));

  const timeMachineEls =
    timeMachineTasks.length > 0
      ? timeMachineTasks.map((task) => (
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
        ))
      : null;

  return (
    <div className="opacity-60">
      {taskEls}
      {timeMachineEls}
    </div>
  );
};

export default TimeMachine;

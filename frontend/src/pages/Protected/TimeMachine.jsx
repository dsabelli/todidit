import { useEffect, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Task from "../../features/Tasks/Task";
import { isBefore, parseJSON, isSameDay } from "date-fns";

import { TimeMachineContext } from "../../context/TimeMachineContext";
const TimeMachine = () => {
  let params = useParams();

  const { timeMachineTasks } = useContext(TimeMachineContext);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();

  const sortTasks = (a, b) => {
    return a.completedOn < b.completedOn
      ? 1
      : a.completedOn > b.completedOn
      ? -1
      : 0;
  };
  useEffect(() => {
    setTasks(
      allTasks.filter(
        (task) =>
          isBefore(parseJSON(task.createdOn), parseJSON(params.date)) ||
          isSameDay(parseJSON(task.completedOn), parseJSON(params.date))
      )
    );
  }, [params.date]);

  const taskEls = tasks
    .sort(sortTasks)
    .map((task) => (
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
    ));

  const timeMachineEls =
    timeMachineTasks.length > 0
      ? timeMachineTasks
          .sort(sortTasks)
          .map((task) =>
            isSameDay(parseJSON(task.completedOn), parseJSON(params.date)) ? (
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
          )
      : null;

  return (
    <div className="opacity-60">
      {taskEls.concat(timeMachineEls)}
      {/* {taskEls}
      {timeMachineEls} */}
    </div>
  );
};

export default TimeMachine;

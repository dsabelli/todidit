import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReadAndUpdateTasks from "../../features/Tasks/ReadAndUpdateTasks";
import { isThisWeek, parseJSON } from "date-fns";
const Week = () => {
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
  ] = useOutletContext();

  useEffect(() => {
    setTasks(allTasks);
  }, []);

  useEffect(() => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) =>
          isThisWeek(parseJSON(task.dueDate), { weekStartsOn: 1 }) ||
          new Date().setHours(0, 0, 0, 0) > parseJSON(task.dueDate)
      )
    );
  }, []);

  return (
    <div>
      <ReadAndUpdateTasks
        user={user}
        tasks={tasks}
        onAddTask={setAddTask}
        onTasks={setTasks}
        onAllTasks={setAllTasks}
        onSystemMessage={setSystemMessage}
        projects={projects}
        projectTitle={projectTitle}
        onProjectTitle={setProjectTitle}
        projectId={projectId}
        onProjectId={setProjectId}
      />
    </div>
  );
};

export default Week;

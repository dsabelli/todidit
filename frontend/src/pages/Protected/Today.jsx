import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReadAndUpdateTasks from "../../features/Tasks/ReadAndUpdateTasks";
import { isToday, parseJSON } from "date-fns";
const Today = () => {
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
    setTasks(allTasks.filter((task) => !task.isChecked));
  }, [allTasks]);

  useEffect(() => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) =>
          isToday(parseJSON(task.dueDate)) ||
          new Date().setHours(0, 0, 0, 0) > parseJSON(task.dueDate)
      )
    );
  }, [allTasks]);

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

export default Today;

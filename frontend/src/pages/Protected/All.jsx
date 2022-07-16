import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../components/context/UserContext";
import ReadAndUpdateTasks from "../../components/Tasks/ReadAndUpdateTasks";
const All = () => {
  const { user } = useContext(UserContext);
  const [
    tasks,
    setTasks,
    allTasks,
    setAllTasks,
    projects,
    setProjects,
    addTask,
    setAddTask,
    addProject,
    setAddProject,
    projectTitle,
    setProjectTitle,
    projectId,
    setProjectId,
    systemMessage,
    setSystemMessage,
  ] = useOutletContext();
  useEffect(() => {
    setTasks(allTasks);
  }, []);
  console.log(tasks);
  return (
    <div>
      All
      <ReadAndUpdateTasks
        user={user}
        tasks={tasks}
        onAddTask={setAddTask}
        onTasks={setTasks}
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

export default All;

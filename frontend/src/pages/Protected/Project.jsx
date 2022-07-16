import { useEffect, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { UserContext } from "../../components/context/UserContext";
import ReadAndUpdateTasks from "../../components/Tasks/ReadAndUpdateTasks";

const Today = () => {
  let params = useParams();
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
    console.log(allTasks);
    console.log("setting all tasks");
  }, [params.id]);
  useEffect(() => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.project === params.id)
    );
    console.log("filtering tasks");
  }, [params.id]);

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

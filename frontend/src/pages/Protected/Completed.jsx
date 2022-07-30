import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../../components/UI/Button";
import { UserContext } from "../../context/UserContext";
import ReadAndUpdateTasks from "../../features/Tasks/ReadAndUpdateTasks";
import taskService from "../../services/tasks";
import diditService from "../../services/didits";
import alertService from "../../services/alerts";
const Completed = () => {
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
    setTasks((prevTasks) => prevTasks.filter((task) => task.isChecked));
  }, [allTasks]);

  const handleDeleteCompletedTasks = async () => {
    const alert = await alertService.alert("Completed Tasks");

    if (alert.isConfirmed) {
      try {
        const deletedTasks = tasks.filter((task) => task.isChecked);
        for (let task of deletedTasks) {
          task.completedOn ? null : (task.completedOn = new Date());
          await diditService.createDidits({ ...task }, user);
          await taskService.deleteTasks(task);

          setTasks((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask.id !== task.id)
          );
          setAllTasks((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask.id !== task.id)
          );
        }
        alertService.success("Idiot!");
      } catch (error) {
        console.log(error);
        setSystemMessage("System encountered an error");
        setTimeout(() => {
          setSystemMessage(null);
        }, 3000);
      }
    }
  };
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
      <Button onClick={() => handleDeleteCompletedTasks()}>Delete All</Button>
    </div>
  );
};

export default Completed;

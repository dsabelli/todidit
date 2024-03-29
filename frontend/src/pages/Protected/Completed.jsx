import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReadAndUpdateTasks from "../../features/Tasks/ReadAndUpdateTasks";
import taskService from "../../services/tasks";
import diditService from "../../services/didits";
import TrashIcon from "../../Assets/Icons/TrashIcon";
import DeleteAlert from "../../layouts/DeleteAlert";
import DeleteSvg from "../../Assets/SVGs/DeleteSvg";

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

  //function to delete all tasks that are completed and create didits
  //update frontend view
  const handleDeleteCompletedTasks = async () => {
    try {
      const deletedTasks = tasks.filter((task) => task.isChecked);
      for (let task of deletedTasks) {
        setTasks((prevTasks) =>
          prevTasks.filter((prevTask) => prevTask.id !== task.id)
        );
        setAllTasks((prevTasks) =>
          prevTasks.filter((prevTask) => prevTask.id !== task.id)
        );
      }

      for (let task of deletedTasks) {
        task.completedOn ? null : (task.completedOn = new Date());
        await diditService.createDidits({ ...task }, user);
        await taskService.deleteTasks(task);
      }
    } catch (error) {
      console.log(error);
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
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
      <div className="mt-4 flex justify-end mx-auto max-w-3xl">
        {tasks.length > 0 && (
          <DeleteAlert
            modalId="Completed"
            openButtonClass="hover:text-error"
            openButton={<TrashIcon className="w-6" />}
            modalTitle="all"
            modalIcon={<DeleteSvg className="w-36 mx-auto my-8" />}
            onClick={() => handleDeleteCompletedTasks()}
          />
        )}
      </div>
    </div>
  );
};

export default Completed;

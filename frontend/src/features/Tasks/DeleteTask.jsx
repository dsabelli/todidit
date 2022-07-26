import taskService from "../../services/tasks";
import diditService from "../../services/didits";

//function to delete tasks from submission of form event
//deletes to db with helper function and updates task in UI
//before deleting, a didit is created from task object and posted with helper

//state and id are passed in as props from ReadandUpdateTasks->Task
const handleDeleteTask = async (
  { tasks, onTasks, onAllTasks, onSystemMessage, user },
  id
) => {
  try {
    const deletedTask = tasks.filter((task) => task.id === id)[0];
    deletedTask.completedOn ? null : (deletedTask.completedOn = new Date());

    await diditService.createDidits({ ...deletedTask }, user);
    await taskService.deleteTasks(deletedTask);

    onTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    onAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  } catch (error) {
    onSystemMessage("System encountered an error");
    setTimeout(() => {
      onSystemMessage(null);
    }, 3000);
  }
};

export default handleDeleteTask;

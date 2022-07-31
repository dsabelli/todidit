import projectService from "../../services/projects";
import taskService from "../../services/tasks";
import diditService from "../../services/didits";

//function to delete projects from submission of form event
//alerts user and requires confirmation on project delete
//deletes to db with helper function and updates projects in UI
//deletes all tasks with helper function and updates task in UI
//before deleting, a didit is created from each task object and posted with helper
//state and id are passed in as props from ReadandUpdateProjects->Project
const handleDeleteProject = async (
  { user, tasks, onTasks, onAllTasks, projects, onProjects, onSystemMessage },
  id,
  navigate
) => {
  const deletedProject = projects.find((project) => project.id === id);

  try {
    const deletedTasks = tasks.filter((task) => task.project === id);
    for (let task of deletedTasks) {
      task.completedOn ? null : (task.completedOn = new Date());
      await diditService.createDidits({ ...task }, user);
      await taskService.deleteTasks(task);
    }

    deletedProject.isArchived = true;
    deletedProject.archivedOn = new Date();
    await projectService.deleteProjects({ ...deletedProject }, user);

    onProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...deletedProject } : project
      )
    );
    onTasks((prevTasks) => prevTasks.filter((task) => task.project !== id));
    onAllTasks((prevTasks) => prevTasks.filter((task) => task.project !== id));

    navigate("/app/today");
  } catch (error) {
    onSystemMessage("System encountered an error");
    setTimeout(() => {
      onSystemMessage(null);
    }, 3000);
  }
};
export default handleDeleteProject;

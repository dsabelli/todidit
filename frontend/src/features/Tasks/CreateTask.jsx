import { useState } from "react";
import taskService from "../../services/tasks";
import TaskForm from "../../components/forms/TaskForm";
import AddIcon from "../../Assets/Icons/AddIcon";
import { useParams } from "react-router-dom";
const CreateTask = ({
  user,
  projects,
  projectTitle,
  onProjectTitle,
  projectId,
  onProjectId,
  tasks,
  onTasks,
  onAllTasks,
  addTask,
  onAddTask,
  onSystemMessage,
}) => {
  let params = useParams();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(new Date());

  //function to show create task form
  const showCreateTaskForm = () => {
    if (params.id) {
      const taskProject = projects.find((project) => project.id === params.id);
      onProjectTitle(taskProject.title);
      onProjectId(taskProject.id);
    }

    setTaskTitle("");
    setTaskDescription("");
    onAddTask((prevVal) => !prevVal);
    onTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //function to hide create task form
  const hideCreateTaskForm = () => {
    onAddTask((prevVal) => !prevVal);
    onProjectTitle("");
    onProjectId("");
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate(new Date());
  };

  //function to create tasks from submission of form event
  //posts to db with helper function and adds new task to UI
  const handleCreateTask = async (e) => {
    try {
      e.preventDefault();
      const newTask = await taskService.createTasks({
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        isChecked: false,
        isEditing: false,
        isImportant: false,
        project: projectId,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate(new Date());
      onProjectId("");
      onProjectTitle("");
      onTasks((prevTasks) => prevTasks.concat(newTask));
      onAllTasks((prevTasks) => prevTasks.concat(newTask));
      showCreateTaskForm();
    } catch (error) {
      onSystemMessage(
        error.response.status === 403
          ? "You cannot add tasks to a deleted project"
          : "System encountered an error. Check your task has a title and project selected."
      );
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {addTask ? (
        <TaskForm
          onSubmit={(e) => handleCreateTask(e)}
          titleValue={taskTitle}
          descriptionValue={taskDescription}
          dueDate={taskDueDate}
          onTitleChange={(e) => setTaskTitle(e.target.value)}
          onDescriptionChange={(e) => setTaskDescription(e.target.value)}
          onDueDate={setTaskDueDate}
          onClick={hideCreateTaskForm}
          projects={projects}
          projectTitle={projectTitle}
          projectId={projectId}
          onProjectId={onProjectId}
          submitText="add"
          tasks={tasks}
        />
      ) : (
        <div
          onClick={() => showCreateTaskForm()}
          className="flex gap-1 mx-auto max-w-3xl py-2 pl-0.5 text-base items-center rounded-md hover:bg-base-200 cursor-pointer "
        >
          <AddIcon className="w-6 text-secondary" />
          <p>Add Task</p>
        </div>
      )}
    </>
  );
};

export default CreateTask;

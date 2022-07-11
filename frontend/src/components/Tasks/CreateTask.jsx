import { useState } from "react";
import taskService from "../../services/tasks";
import TaskForm from "../TaskForm";

const CreateTask = ({
  projects,
  projectTitle,
  projectId,
  onProjectId,
  onTasks,
  onAddTask,
  onSystemMessage,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(new Date());

  //function to show create task form
  const showCreateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    onAddTask((prevVal) => !prevVal);
    onTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //function to hide create task form
  const hideCreateTaskForm = (e) => {
    e.preventDefault();
    onAddTask((prevVal) => !prevVal);
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
        project: projectId,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate(new Date());
      onProjectId("");
      onTasks((prevTasks) => prevTasks.concat(newTask));
      showCreateTaskForm();
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {" "}
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
      />
    </>
  );
};

export default CreateTask;

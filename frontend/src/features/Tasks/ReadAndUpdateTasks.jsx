import { useState } from "react";
import taskService from "../../services/tasks";
import TaskForm from "../../components/forms/TaskForm";
import Task from "./Task";
import handleDeleteTask from "./DeleteTask";
import { parseJSON } from "date-fns";
const ReadAndUpdateTasks = ({
  user,
  projects,
  projectTitle,
  onProjectTitle,
  projectId,
  onProjectId,
  tasks,
  onTasks,
  onAllTasks,
  onAddTask,
  onSystemMessage,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(new Date());

  //function to show task form for editing task inline, populates fields with current data
  //hides the current task being edited
  const showUpdateTaskForm = (id) => {
    const projectId = tasks.filter((task) => task.id === id)[0].project;

    onProjectId(projectId);
    onProjectTitle(projects.filter((task) => task.id === projectId)[0].title);
    onAddTask(false);
    setTaskTitle(tasks.filter((task) => task.id === id)[0].title);
    setTaskDescription(tasks.filter((task) => task.id === id)[0].description);
    setTaskDueDate(
      parseJSON(tasks.filter((task) => task.id === id)[0].dueDate)
    );
    onTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: !task.isEditing }
          : { ...task, isEditing: false }
      )
    );
  };

  //function to hide task form for editing task
  //resets form fields on cancel
  const hideUpdateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate(new Date());
    onProjectTitle("");
    onTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //function to update tasks from submission of form event
  //puts to db with helper function and updates task in UI
  const handleUpdateTask = async (e, id) => {
    try {
      e.preventDefault();
      const tasktoUpdate = tasks.filter((task) => task.id === id)[0];

      const updatedTask = await taskService.updateTasks({
        ...tasktoUpdate,
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        isEditing: false,
        project: projectId,
      });

      onTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...updatedTask } : task))
      );
      onAllTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...updatedTask } : task))
      );
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate(new Date());
      onProjectId("");
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  //function to update if a task has been completed
  //sets completedOn date and updates UI to show strikethrough task
  const handleUpdateCheck = async (id) => {
    try {
      const currentDate = new Date();
      const updatedTask = tasks.filter((task) => task.id === id)[0];
      await taskService.updateTasks({
        ...updatedTask,
        isChecked: !updatedTask.isChecked,
        completedOn: !updatedTask.isChecked ? currentDate : null,
      });

      onTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                isChecked: !task.isChecked,
                completedOn: !task.isChecked ? currentDate : null,
              }
            : task
        )
      );
      onAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                isChecked: !task.isChecked,
                completedOn: !task.isChecked ? currentDate : null,
              }
            : task
        )
      );
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  const handleUpdateImportant = async (id) => {
    try {
      const updatedTask = tasks.filter((task) => task.id === id)[0];
      await taskService.updateTasks({
        ...updatedTask,
        isImportant: !updatedTask.isImportant,
      });

      onTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                isImportant: !task.isImportant,
              }
            : task
        )
      );
      onAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isImportant: !task.isImportant } : task
        )
      );
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  const taskElements = tasks.map((task) =>
    task.isEditing ? (
      <TaskForm
        key={task.id}
        id={task.id}
        titleValue={taskTitle}
        descriptionValue={taskDescription || task.description}
        dueDate={taskDueDate}
        onSubmit={(e) => handleUpdateTask(e, task.id)}
        onTitleChange={(e) => setTaskTitle(e.target.value)}
        onDescriptionChange={(e) => setTaskDescription(e.target.value)}
        onDueDate={setTaskDueDate}
        onClick={hideUpdateTaskForm}
        projects={projects}
        projectTitle={projectTitle}
        projectId={projectId}
        onProjectId={onProjectId}
        submitText="save"
        tasks={tasks}
      />
    ) : (
      <Task
        checked={task.isChecked}
        onCheck={handleUpdateCheck}
        onImportant={handleUpdateImportant}
        onDelete={() =>
          handleDeleteTask(
            {
              tasks,
              onTasks,
              onAllTasks,
              onSystemMessage,
              user,
            },
            task.id
          )
        }
        onUpdate={showUpdateTaskForm}
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        key={task.id}
        id={task.id}
        completedOn={task.completedOn}
        important={task.isImportant}
        project={task.project}
        projects={projects}
      />
    )
  );
  return <>{taskElements}</>;
};

export default ReadAndUpdateTasks;

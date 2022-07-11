import { useLocation } from "react-router-dom";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";

const All = ({}) => {
  let location = useLocation();
  let tasks = location.state;
  console.log(location);
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
        onProjectId={setProjectId}
        submitText="save"
      />
    ) : (
      <Task
        checked={task.isChecked}
        onCheck={handleUpdateCheck}
        onDelete={handleDeleteTask}
        onUpdate={showUpdateTaskForm}
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        key={task.id}
        id={task.id}
      />
    )
  );
  return { taskElements };
};

export default All;

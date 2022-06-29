import { useEffect, useState } from "react";
import Register from "./components/register";
import Login from "./components/Login";
import Task from "./components/Task";
import CreateTaskForm from "./components/CreateTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import Navbar from "./components/Navbar";
import registrationService from "./services/register";
import loginService from "./services/login";
import taskService from "./services/tasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    await registrationService.register({
      username,
      email,
      password,
    });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedIn", JSON.stringify(user));
    taskService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  //button to show task form
  const handleAddTask = () => {
    setAddTask((prevVal) => !prevVal);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  const handleCancelAddTask = (e) => {
    e.preventDefault();
    setAddTask((prevVal) => !prevVal);
    setTaskTitle("");
    setTaskDescription("");
  };

  //function to create tasks
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const newTask = await taskService.createTasks({
      title: taskTitle,
      description: taskDescription,
      checked: false,
      isEditing: false,
    });
    setTaskTitle("");
    setTaskDescription("");
    setTasks((prevTasks) => prevTasks.concat(newTask));
    handleAddTask();
  };

  //button to show task form for editing task
  const handleEditTask = (id) => {
    setAddTask(false);
    setTaskTitle(tasks.filter((task) => task.id === id)[0].title);
    setTaskDescription(tasks.filter((task) => task.id === id)[0].description);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: !task.isEditing }
          : { ...task, isEditing: false }
      )
    );
  };

  //function to update tasks
  const handleUpdateTask = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const updatedTask = tasks.filter((task) => task.id === id)[0];
    //move these into taskservice function
    updatedTask.title = taskTitle;
    updatedTask.description = taskDescription;
    updatedTask.isEditing = false;
    console.log(updatedTask);
    await taskService.updateTasks({
      ...updatedTask,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: updatedTask.title,
              description: updatedTask.description,
              isEditing: updatedTask.isEditing,
            }
          : task
      )
    );
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleUpdateCheck = async (id) => {
    const updatedTask = tasks.filter((task) => task.id === id)[0];
    await taskService.updateTasks({
      ...updatedTask,
      checked: !updatedTask.checked,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDeleteTask = async (id) => {
    const deletedTask = tasks.filter((task) => task.id === id)[0];
    await taskService.deleteTasks(deletedTask);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const taskElements = tasks.map((task) =>
    task.isEditing ? (
      <UpdateTaskForm
        key={task.id}
        id={task.id}
        title={taskTitle}
        description={taskDescription || task.description}
        onTaskUpdate={handleUpdateTask}
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        cancel={handleEditTask}
      />
    ) : (
      <Task
        checked={task.checked}
        onCheck={handleUpdateCheck}
        onDelete={handleDeleteTask}
        onUpdate={handleEditTask}
        title={task.title}
        description={task.description}
        key={task.id}
        id={task.id}
      />
    )
  );

  useEffect(() => {
    const getTasks = async () => {
      const response = await taskService.getTasks(user || "");
      setTasks(response);
    };
    getTasks();
  }, [user]);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        user={user}
        onLogout={handleLogout}
        newUser={newUser}
        onNewUser={handleNewUser}
      />
      {newUser && (
        <Register
          username={username}
          email={email}
          password={password}
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onRegister={handleRegistration}
        />
      )}
      {!user && (
        <Login
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
        />
      )}
      {taskElements}

      {addTask ? (
        <CreateTaskForm
          onTaskCreation={handleCreateTask}
          title={taskTitle}
          description={taskDescription}
          onTitleChange={setTaskTitle}
          onDescriptionChange={setTaskDescription}
          cancel={handleCancelAddTask}
        />
      ) : (
        <button onClick={() => handleAddTask()} className="btn mt-10 ">
          Add Task
        </button>
      )}
    </div>
  );
}

export default App;

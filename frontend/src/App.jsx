import { useEffect, useState } from "react";
import Register from "./components/register";
import Login from "./components/Login";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";
import registrationService from "./services/register";
import loginService from "./services/login";
import taskService from "./services/tasks";
import "./App.css";
import EditInline from "./components/EditInline";

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
  };

  const handleCancelAddTask = () => {
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
    });
    setTaskTitle("");
    setTaskDescription("");
    setTasks((prevTasks) => prevTasks.concat(newTask));
    handleAddTask();
  };

  //button to show task form for editing task
  const handleEditTask = (id) => {
    console.log(id);
  };

  //function to update tasks
  const handleUpdateTask = async (id) => {
    const updatedTask = tasks.filter((task) => task.id === id)[0];
    await taskService.updateTasks({ ...updatedTask });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: updatedTask.title,
              description: updatedTask.description,
            }
          : task
      )
    );
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

  const taskElements = tasks.map((task) => (
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
  ));

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
        <TaskForm
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

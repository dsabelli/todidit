import { useEffect, useState } from "react";
import Register from "./components/Register";
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
  const [systemMessage, setSystemMessage] = useState("");

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      await registrationService.register({
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      handleNewUser();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  //look for a better solution to this
  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

  //function for handling user login
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedIn", JSON.stringify(user));
    taskService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
  };

  //review if this is secure, what about backend logout?
  const handleLogout = () => {
    window.localStorage.clear();
  };

  //button to show create task form
  const showCreateTaskForm = () => {
    setAddTask((prevVal) => !prevVal);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //button to hide create task form
  const hideCreateTaskForm = (e) => {
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
    showCreateTaskForm();
  };

  //button to show task form for editing task
  const showUpdateTaskForm = (id) => {
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

  //button to hide task form for editing task
  const hideUpdateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //function to update tasks
  const handleUpdateTask = async (e, id) => {
    e.preventDefault();
    const updatedTask = tasks.filter((task) => task.id === id)[0];
    //move these into taskservice function
    updatedTask.title = taskTitle;
    updatedTask.description = taskDescription;
    updatedTask.isEditing = false;
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

  //function to update if a task has been completed
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

  //function to handle deleting a task
  const handleDeleteTask = async (id) => {
    const deletedTask = tasks.filter((task) => task.id === id)[0];
    await taskService.deleteTasks(deletedTask);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //map out tasks into Task Components and on edit switch out for Task Form
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
        cancel={hideUpdateTaskForm}
      />
    ) : (
      <Task
        checked={task.checked}
        onCheck={handleUpdateCheck}
        onDelete={handleDeleteTask}
        onUpdate={showUpdateTaskForm}
        title={task.title}
        description={task.description}
        key={task.id}
        id={task.id}
      />
    )
  );

  //Get a user's tasks. Look into setting a timeout and "loading" screen
  useEffect(() => {
    const getTasks = async () => {
      const response = await taskService.getTasks(user || "");
      setTasks(response);
    };
    getTasks();
  }, [user]);

  //Checks if a user's token is stored in local storage
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
      {systemMessage}
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
          cancel={hideCreateTaskForm}
        />
      ) : (
        <button onClick={() => showCreateTaskForm()} className="btn mt-10 ">
          Add Task
        </button>
      )}
    </div>
  );
}

export default App;

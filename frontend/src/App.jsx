import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Task from "./components/Task";
import CreateTaskForm from "./components/CreateTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import Navbar from "./components/Navbar";
import taskService from "./services/tasks";
import diditService from "./services/didits";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [didits, setDidits] = useState([]);
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  //look for a better solution to this
  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
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
    try {
      e.preventDefault();

      const newTask = await taskService.createTasks({
        title: taskTitle,
        description: taskDescription,
        isChecked: false,
        isEditing: false,
        date: Date.now(),
      });
      setTaskTitle("");
      setTaskDescription("");
      setTasks((prevTasks) => prevTasks.concat(newTask));
      showCreateTaskForm();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
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
    try {
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
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to update if a task has been completed
  const handleUpdateCheck = async (id) => {
    try {
      const updatedTask = tasks.filter((task) => task.id === id)[0];
      await taskService.updateTasks({
        ...updatedTask,
        isChecked: !updatedTask.isChecked,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isChecked: !task.isChecked } : task
        )
      );
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to handle deleting a task and posting to didits
  const handleDeleteTask = async (id) => {
    try {
      const deletedTask = tasks.filter((task) => task.id === id)[0];
      const newDidit = diditService.createDidits({ ...deletedTask }, user);

      setDidits((prevDidits) => prevDidits.concat(newDidit));

      await taskService.deleteTasks(deletedTask);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
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
        checked={task.isChecked}
        onCheck={handleUpdateCheck}
        onDelete={handleDeleteTask}
        onUpdate={showUpdateTaskForm}
        title={task.title}
        description={task.description}
        date={task.date}
        key={task.id}
        id={task.id}
      />
    )
  );
  const handleLogout = () => {
    window.localStorage.clear();
  };

  //Checks if a user's token is stored in local storage
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
    }
  }, []);

  //Get a user's tasks. Look into setting a timeout and "loading" screen
  useEffect(() => {
    try {
      const getTasks = async () => {
        const response = await taskService.getTasks(user || "");
        setTasks(response);
      };
      getTasks();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  //get a user's didits
  useEffect(() => {
    try {
      const getDidits = async () => {
        const response = await diditService.getDidits(user || "");
        setDidits(response);
      };
      setTimeout(() => {
        getDidits();
      }, 1000);
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  return (
    <div className="App">
      <Navbar
        user={user}
        onLogout={handleLogout}
        newUser={newUser}
        onNewUser={handleNewUser}
      />
      <h2 className="bg-red-700 my-5"> {systemMessage}</h2>
      {newUser && <Register handleNewUser={handleNewUser} />}
      {!user && <Login onUser={setUser} />}
      {taskElements}
      {user && addTask ? (
        <CreateTaskForm
          onTaskCreation={handleCreateTask}
          title={taskTitle}
          description={taskDescription}
          onTitleChange={setTaskTitle}
          onDescriptionChange={setTaskDescription}
          cancel={hideCreateTaskForm}
        />
      ) : (
        user && (
          <button onClick={() => showCreateTaskForm()} className="btn mt-10 ">
            Add Task
          </button>
        )
      )}
    </div>
  );
}

export default App;

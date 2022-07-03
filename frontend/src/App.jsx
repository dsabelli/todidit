import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Task from "./components/Task";
import CreateTaskForm from "./components/CreateTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import Navbar from "./components/Navbar";
import taskService from "./services/tasks";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [yesterday, setYesterday] = useState("62c1d36fc00855bb5d10ef81");
  const [today, setToday] = useState("");
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const [counter, setCounter] = useState(0);

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

  //
  //creates new document in which the day's tasks will be stored
  const handleCreateDoc = async () => {
    const newDoc = await taskService.createDoc({
      user: "62c1d45f05d1a2704c8473cb",
    });
    console.log(newDoc.id);
    setYesterday(today);
    setToday((prevDay) => (prevDay = "62c1f08105d1a2704c847686"));
    console.log(today);
    // setTasks((prevTasks) => prevTasks.concat(newTask));
    // showCreateTaskForm();
  };
  //function to create tasks
  const handleCreateTask = async (e) => {
    try {
      e.preventDefault();
      const newTask = await taskService.createTasks({
        id: "62c1f39c05d1a2704c8476e6",
        tasks: {
          title: taskTitle,
          description: taskDescription,
          checked: false,
          isEditing: false,
        },
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
        checked: !updatedTask.checked,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, checked: !task.checked } : task
        )
      );
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to handle deleting a task
  const handleDeleteTask = async (id) => {
    try {
      const deletedTask = tasks.filter((task) => task.id === id)[0];
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
  const handleLogout = () => {
    window.localStorage.clear();
  };

  const checkDate = () => {
    console.log("Checking dates");
    const currentDate = new Date();
    const oldDate = date;
    console.log(oldDate);
    // setDate((prevDate) =>
    //   Number(prevDate.getDate()) - 1 !== currentDate.getDate()
    //     ? (prevDate = currentDate)
    //     : prevDate
    // );
    console.log(currentDate);
    if (Number(oldDate.getDate() - 1 !== currentDate.getDate())) {
      console.log("Creating new doc");
      handleCreateDoc();
    }
  };

  // useEffect(() => {
  //   // const oldDate = `${Number(date.getDate()) - 1} ${Number(
  //   //   date.getMonth() + 1
  //   // )} ${date.getFullYear()}`;
  //   const currentDate = new Date();
  //   // const newDate = `${currentDate.getDate()} ${Number(
  //   //   currentDate.getMonth() + 1
  //   // )} ${currentDate.getFullYear()}`;
  //   // console.log(oldDate, newDate);
  //   setDate((prevDate) =>
  //     Number(prevDate.getDate()) !== currentDate.getDate()
  //       ? (prevDate = currentDate)
  //       : prevDate
  //   );
  //   checkDate();
  //   console.log(date);
  // }, []);

  // useEffect(() => {
  //   console.log("hi mom");
  // }, [date]);
  //Get a user's tasks. Look into setting a timeout and "loading" screen
  useEffect(() => {
    try {
      const getTasks = async () => {
        const response = await taskService.getTasks(
          "62c1d45f05d1a2704c8473cb",
          "62c1f39c05d1a2704c8476e6"
        );
        console.log(response[0].tasks);
        setTasks(response[0].tasks);
      };
      getTasks();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, []);

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
      <h2 className="bg-red-700 my-5"> {systemMessage}</h2>
      {newUser && <Register handleNewUser={handleNewUser} />}
      {!user && <Login onUser={setUser} onLogin={checkDate} />}
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

import { useEffect, useState, useMemo, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isToday, parseJSON } from "date-fns";
import Landing from "./pages/Landing";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Button from "./components/UI/Button";
import ErrorMessage from "./components/UI/ErrorMessage";
import taskService from "./services/tasks";
import projectService from "./services/projects";
import userService from "./services/users";
import CreateTask from "./components/Tasks/CreateTask";
import ReadAndUpdateTasks from "./components/Tasks/ReadAndUpdateTasks";
import CreateProject from "./components/Projects/CreateProject";
import ReadAndUpdateProjects from "./components/Projects/ReadAndUpdateProjects";
import All from "./pages/All";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./components/context/UserContext";
import "./App.css";

function App() {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Logs user out of current session
  const handleLogout = () => {
    // navigate("/");
    window.localStorage.clear();
  };

  //Checks if a user's token is stored in local storage
  //If it is, re-login is not required and token is parsed and set for use
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
    }
  }, []);

  //get's a user's projects.
  useEffect(() => {
    try {
      const getProjects = async () => {
        const response = await projectService.getProjects(user || "");
        setProjects(response);
      };
      getProjects();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  //Get a user's tasks. Look into setting a timeout and "loading" screen
  useEffect(() => {
    try {
      const getTasks = async () => {
        const response = await taskService.getTasks(user || "");
        setTasks(response);
        setAllTasks(response);
      };
      getTasks();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  const handleDeleteUser = async (user) => {
    await userService.deleteUser(user);
    handleLogout();
  };

  return (
    <div className="App">
      {/* <Button text="Delete Self" onClick={() => handleDeleteUser(user)} /> */}
      <Navbar user={user} onLogout={handleLogout} projects={projects} />
      {systemMessage && <ErrorMessage errorMessage={systemMessage} />}

      {user && (
        <Menu>
          <ReadAndUpdateProjects
            user={user}
            tasks={tasks}
            onTasks={setTasks}
            projects={projects}
            onProjects={setProjects}
            projectTitle={projectTitle}
            onProjectTitle={setProjectTitle}
            onAddProject={setAddProject}
            onSystemMessage={setSystemMessage}
          />
          <CreateProject
            user={user}
            onProjects={setProjects}
            projectTitle={projectTitle}
            onProjectTitle={setProjectTitle}
            addProject={addProject}
            onAddProject={setAddProject}
            onSystemMessage={setSystemMessage}
          />
        </Menu>
      )}
      {/* {//filter and display tasks due today (TEMPORARY FUNCTION!!!!)} */}
      {user && (
        <Button
          text="Today"
          onClick={() => {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => isToday(parseJSON(task.dueDate)))
            );
          }}
        />
      )}
      {/* {//Sets back all tasks (TEMPORARRY FUNCTION!!)} */}
      {user && (
        <Button
          text="All"
          onClick={() => {
            setTasks(allTasks);
          }}
        />
      )}
      {user && (
        <ReadAndUpdateTasks
          user={user}
          tasks={tasks}
          onAddTask={setAddTask}
          onTasks={setTasks}
          onSystemMessage={setSystemMessage}
          projects={projects}
          projectTitle={projectTitle}
          onProjectTitle={setProjectTitle}
          projectId={projectId}
          onProjectId={setProjectId}
        />
      )}

      <CreateTask
        user={user}
        addTask={addTask}
        onAddTask={setAddTask}
        onTasks={setTasks}
        onSystemMessage={setSystemMessage}
        projects={projects}
        projectTitle={projectTitle}
        projectId={projectId}
        onProjectId={setProjectId}
      />

      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/app/all" element={<All />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

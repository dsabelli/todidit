import { useEffect, useState } from "react";
import { isToday, parseJSON } from "date-fns";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Button from "./components/UI/Button";
import ErrorMessage from "./components/UI/ErrorMessage";
import taskService from "./services/tasks";
import projectService from "./services/projects";
import diditService from "./services/didits";
import CreateTask from "./components/Tasks/CreateTask";
import ReadAndUpdateTasks from "./components/Tasks/ReadAndUpdateTasks";
import CreateProject from "./components/Projects/CreateProject";
import ReadAndUpdateProjects from "./components/Projects/ReadAndUpdateProjects";

import "./App.css";

function App() {
  // let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  //shows or hides the register form
  //look for a better solution to this
  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

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

  return (
    <div className="App">
      <Navbar
        user={user}
        onLogout={handleLogout}
        newUser={newUser}
        onNewUser={handleNewUser}
        diditTitle={diditTitle}
        onDiditTitleChange={setDiditTitle}
        onDiditSearch={getDidits}
        onDiditDateStart={setDiditDateStart}
        onDiditDateEnd={setDiditDateEnd}
      />
      {systemMessage && <ErrorMessage errorMessage={systemMessage} />}
      {newUser && <Register handleNewUser={handleNewUser} />}
      {!user && !newUser && <Login onUser={setUser} />}
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
    </div>
  );
}

export default App;

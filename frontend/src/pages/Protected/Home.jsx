import { useState, useEffect, useContext, useMemo } from "react";
import { isToday, parseJSON } from "date-fns";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import Button from "../../components/UI/Button";
import ErrorMessage from "../../components/UI/ErrorMessage";
import projectService from "../../services/projects";
import userService from "../../services/users";
import taskService from "../../services/tasks";
import CreateTask from "../../components/Tasks/CreateTask";
import ReadAndUpdateTasks from "../../components/Tasks/ReadAndUpdateTasks";
import ArchivedProjects from "../../components/Projects/ArchivedProjects";
import CreateProject from "../../components/Projects/CreateProject";
import ReadAndUpdateProjects from "../../components/Projects/ReadAndUpdateProjects";
import { UserContext } from "../../components/context/UserContext";
import { Link, Outlet } from "react-router-dom";
import { DiditContext } from "../../components/context/DiditContext";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [addTask, setAddTask] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [didits, setDidits] = useState([]);
  const diditValue = useMemo(
    () => ({ didits, setDidits }),
    [didits, setDidits]
  );

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

  // const handleDeleteUser = async (user) => {
  //   await userService.deleteUser(user);
  //   handleLogout();
  // };
  return (
    <div className="App">
      {/* <Button text="Delete Self" onClick={() => handleDeleteUser(user)} /> */}
      <DiditContext.Provider value={diditValue}>
        <Navbar projects={projects} />
      </DiditContext.Provider>
      {systemMessage && <ErrorMessage errorMessage={systemMessage} />}

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
        <ArchivedProjects projects={projects} />
      </Menu>
      <DiditContext.Provider value={diditValue}>
        <Outlet
          context={[
            tasks,
            setTasks,
            allTasks,
            setAllTasks,
            projects,
            setAddTask,
            projectTitle,
            setProjectTitle,
            projectId,
            setProjectId,
            setSystemMessage,
          ]}
        />
      </DiditContext.Provider>
      <CreateTask
        user={user}
        addTask={addTask}
        onAddTask={setAddTask}
        onTasks={setTasks}
        onAllTasks={setAllTasks}
        onSystemMessage={setSystemMessage}
        projects={projects}
        projectTitle={projectTitle}
        projectId={projectId}
        onProjectId={setProjectId}
      />
    </div>
  );
};

export default Home;

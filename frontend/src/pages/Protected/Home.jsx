import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Loader from "../../components/UI/Loader";
import { DateFormatContext } from "../../context/DateFormatContext";
import { DiditContext } from "../../context/DiditContext";
import { SettingsContext } from "../../context/SettingsContext";
import { TimeMachineContext } from "../../context/TimeMachineContext";
import { UserContext } from "../../context/UserContext";
import CreateNote from "../../features/Notes/CreateNote";
import ArchivedProjects from "../../features/Projects/ArchivedProjects";
import CreateProject from "../../features/Projects/CreateProject";
import ReadAndUpdateProjects from "../../features/Projects/ReadAndUpdateProjects";
import CreateTask from "../../features/Tasks/CreateTask";
import Menu from "../../layouts/Menu";
import Navbar from "../../layouts/Navbar";
import SortButton from "../../layouts/SortButton";
import noteService from "../../services/notes";
import projectService from "../../services/projects";
import taskService from "../../services/tasks";
import userService from "../../services/users";
import { getHeader } from "../../utils/headers";

const Home = ({ onTheme }) => {
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [notes, setNotes] = useState(["new note"]);
  const [systemMessage, setSystemMessage] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState();
  const { setDateFormat } = useContext(DateFormatContext);
  const { user, setUser } = useContext(UserContext);
  const { settings, setSettings } = useContext(SettingsContext);
  const [didits, setDidits] = useState([]);
  const diditValue = useMemo(
    () => ({ didits, setDidits }),
    [didits, setDidits]
  );
  const [timeMachineTasks, setTimeMachineTasks] = useState([]);
  const timeMachineValue = useMemo(
    () => ({ timeMachineTasks, setTimeMachineTasks }),
    [timeMachineTasks, setTimeMachineTasks]
  );

  let location = useLocation();
  let params = useParams();
  let navigate = useNavigate();

  //checks if the current page is an archived project or didit
  //to be used for hiding the create task btn/form and sort btn
  let showAddTask =
    location.pathname.includes("didit") ||
    location.pathname.includes("archive") ||
    location.pathname.includes("completed") ||
    location.pathname.includes("time") ||
    location.pathname === "/app" ||
    location.pathname === "/app/" ||
    location.pathname.includes("/notes");

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

  //Gets the user's settings once user is set.
  useEffect(() => {
    try {
      const getUserSettings = async () => {
        const response = await userService.getUser(user);
        setSettings(response.settings[0]);
      };
      user && getUserSettings();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  //Sets the user's settings into state once the settings are set in state/context.
  useEffect(() => {
    try {
      const setUserSettings = async () => {
        setDateFormat(settings.dateFormat);
        onTheme(settings.theme);
        setSortBy(settings.sortBy);
        setOrder(settings.order);
      };
      setUserSettings();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [settings]);

  //Gets a user's projects once user is set.
  useEffect(() => {
    try {
      const getProjects = async () => {
        const response = await projectService.getProjects(user);
        setProjects(response);
      };
      user && getProjects();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  //Gets a user's notes once user is set.
  useEffect(() => {
    try {
      const getNotes = async () => {
        const response = await noteService.getNotes(user);
        setNotes(response);
      };
      user && getNotes();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  //Gets a user's tasks once user is set.
  useEffect(() => {
    try {
      const getTasks = async () => {
        const response = await taskService.getTasks(user);
        setTasks(response);
        setAllTasks(response);
        setTimeout(() => {
          setLoaded(true);
        }, 500);
      };
      user && getTasks();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  }, [user]);

  return loaded ? (
    <DiditContext.Provider value={diditValue}>
      <TimeMachineContext.Provider value={timeMachineValue}>
        <Navbar projects={projects}>
          <div>
            <Menu
              tasks={allTasks}
              projects={projects}
              notes={notes}
              className="text-left text-xl py-6"
            >
              <ReadAndUpdateProjects
                user={user}
                tasks={tasks}
                onTasks={setTasks}
                allTasks={allTasks}
                onAllTasks={setAllTasks}
                projects={projects}
                onProjects={setProjects}
                projectTitle={projectTitle}
                onProjectTitle={setProjectTitle}
                onAddProject={setAddProject}
                onSystemMessage={setSystemMessage}
                navigate={navigate}
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
          </div>
          <div>
            {systemMessage && (
              <div className="mt-6">
                <ErrorMessage errorMessage={systemMessage} />
              </div>
            )}
            <header className="max-w-3xl mx-auto flex justify-between items-center">
              {getHeader(location, params, projects)}
              {!showAddTask && (
                <SortButton
                  sortBy={sortBy}
                  onSortBy={setSortBy}
                  order={order}
                  onOrder={setOrder}
                  tasks={tasks}
                  onTasks={setTasks}
                  allTasks={allTasks}
                  onAllTasks={setAllTasks}
                />
              )}
            </header>
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

            {!showAddTask && (
              <CreateTask
                user={user}
                addTask={addTask}
                onAddTask={setAddTask}
                onTasks={setTasks}
                onAllTasks={setAllTasks}
                onSystemMessage={setSystemMessage}
                projects={projects}
                projectTitle={projectTitle}
                onProjectTitle={setProjectTitle}
                projectId={projectId}
                onProjectId={setProjectId}
                tasks={tasks}
              />
            )}
            {location.pathname.includes("/notes") && (
              <CreateNote
                user={user}
                notes={notes}
                onNotes={setNotes}
                addTask={addTask}
                onAddTask={setAddTask}
                onSystemMessage={setSystemMessage}
              />
            )}
          </div>
        </Navbar>
      </TimeMachineContext.Provider>
    </DiditContext.Provider>
  ) : (
    <Loader />
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isToday, parseJSON } from "date-fns";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Didit from "./components/Didit";
import ProjectForm from "./components/ProjectForm";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Button from "./components/UI/Button";
import ErrorMessage from "./components/UI/ErrorMessage";
import taskService from "./services/tasks";
import projectService from "./services/projects";
import diditService from "./services/didits";
import alertService from "./services/alerts";
import CreateTask from "./components/Tasks/CreateTask";
import ReadAndUpdateTasks from "./components/Tasks/ReadAndUpdateTasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [didits, setDidits] = useState([]);
  const [diditTitle, setDiditTitle] = useState("");
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");
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

  //function to show create project form
  const showCreateProjectForm = () => {
    setProjectTitle("");
    setAddProject((prevVal) => !prevVal);
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //function to hide create project form
  const hideCreateProjectForm = (e) => {
    e.preventDefault();
    setAddProject((prevVal) => !prevVal);
    setProjectTitle("");
  };

  //function to create projects from submission of form event
  //posts to db with helper function and adds new task to UI
  const handleCreateProject = async (e) => {
    try {
      e.preventDefault();
      const newProject = await projectService.createProjects(
        {
          title: projectTitle,
        },
        user
      );
      setProjectTitle("");

      setProjects((prevProjects) => prevProjects.concat(newProject));
      showCreateProjectForm();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to show task form for editing task inline, populates fields with current data
  //hides the current task being edited
  const showUpdateProjectForm = (e, id) => {
    e.stopPropagation();
    setAddProject(false);
    setProjectTitle(projects.filter((project) => project.id === id)[0].title);

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, isEditing: !project.isEditing }
          : { ...project, isEditing: false }
      )
    );
  };

  //function to hide task form for editing project
  //resets form fields on cancel
  const hideUpdateProjectForm = () => {
    setProjectTitle("");
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //function to update project from submission of form event
  //puts to db with helper function and updates task in UI
  const handleUpdateProject = async (e, id) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const updatedProject = projects.filter((project) => project.id === id)[0];
      //move these into taskservice function

      updatedProject.title = projectTitle;
      updatedProject.isEditing = false;
      await projectService.updateProjects(
        {
          ...updatedProject,
        },
        user
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id
            ? {
                ...project,
                title: updatedProject.title,
                isEditing: updatedProject.isEditing,
              }
            : project
        )
      );
      setProjectTitle("");
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to delete projects from submission of form event
  //alerts user and requires confirmation on project delete
  //deletes to db with helper function and updates projects in UI
  //deletes all tasks with helper function and updates task in UI
  //before deleting, a didit is created from each task object and posted with helper

  const handleDeleteProject = async (e, id) => {
    e.stopPropagation();
    const deletedProject = projects.filter((project) => project.id === id)[0];
    const alert = await alertService.alert(deletedProject.title);
    if (alert.isConfirmed) {
      try {
        const deletedTasks = tasks.filter((task) => task.project === id);
        for (let task of deletedTasks) {
          const newDidit = await diditService.createDidits({ ...task }, user);

          setDidits((prevDidits) => prevDidits.concat(newDidit));
          await taskService.deleteTasks(task);
        }

        deletedProject.isArchived = true;
        deletedProject.archivedOn = new Date();
        await projectService.deleteProjects({ ...deletedProject }, user);

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.project !== id)
        );

        alertService.success(deletedProject.title);
      } catch (error) {
        setSystemMessage("System encountered an error");
        setTimeout(() => {
          setSystemMessage(null);
        }, 3000);
      }
    }
  };

  const getDidits = async (diditTitle) => {
    if (diditTitle) {
      const didits = await diditService.getDidits(
        diditTitle,
        diditDateStart,
        diditDateEnd
      );
      setDiditTitle(didits);
      // } else if ((diditDateStart, diditDateEnd)) {
      //   const didits = await diditService.getDidits(
      //     (diditTitle = ""),
      //     diditDateStart,
      //     diditDateEnd
      //   );
      //   setDiditTitle(didits);
    } else {
      setDiditTitle("");
    }
  };

  const diditElements = didits.map((didit) => (
    <Didit
      title={didit.title}
      description={didit.description}
      date={didit.date}
      key={didit.id}
      id={didit.id}
    />
  ));

  //Logs user out of current session
  const handleLogout = () => {
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

  //get a user's didits
  // useEffect(() => {
  //   try {
  //     const getDidits = async () => {
  //       const response = await diditService.getDidits(user || "");
  //       setDidits(response);
  //     };
  //     setTimeout(() => {
  //       getDidits();
  //     }, 1000);
  //   } catch (error) {
  //     setSystemMessage("System encountered an error");
  //     setTimeout(() => {
  //       setSystemMessage(null);
  //     }, 3000);
  //   }
  // }, [user]);

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
      {!user && <Login onUser={setUser} />}
      {user && (
        <Menu
          tasks={tasks}
          projects={projects}
          title={projectTitle}
          onTitleChange={setProjectTitle}
          onProjectUpdate={handleUpdateProject}
          onProjectId={setProjectId}
          onUpdate={showUpdateProjectForm}
          cancel={hideUpdateProjectForm}
          onDelete={handleDeleteProject}
        >
          {addProject ? (
            <ProjectForm
              onSubmit={(e) => handleCreateProject(e)}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onClick={hideCreateProjectForm}
              submitText="add"
            />
          ) : (
            user && (
              <Button
                onClick={() => showCreateProjectForm()}
                className="btn mt-10 "
                text="Add Project"
              />
            )
          )}
        </Menu>
      )}
      {/* {//filter and display tasks due today (TEMPORARY FUNCTION!!!!)} */}
      <Button
        text="Today"
        onClick={() => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => isToday(parseJSON(task.dueDate)))
          );
          // navigate("/today");
        }}
      />
      {/* {//Sets back all tasks (TEMPORARRY FUNCTION!!)} */}
      <Button
        text="All"
        onClick={() => {
          setTasks(allTasks);
          // navigate("/all");
        }}
      />
      {user && (
        <ReadAndUpdateTasks
          user={user}
          tasks={tasks}
          onAddTask={setAddTask}
          onTasks={setTasks}
          onDidits={setDidits}
          onSystemMessage={setSystemMessage}
          projects={projects}
          projectTitle={projectTitle}
          onProjectTitle={setProjectTitle}
          projectId={projectId}
          onProjectId={setProjectId}
        />
      )}
      <Outlet />
      {user && addTask ? (
        <CreateTask
          onAddTask={setAddTask}
          onTasks={setTasks}
          onSystemMessage={setSystemMessage}
          projects={projects}
          projectTitle={projectTitle}
          projectId={projectId}
          onProjectId={setProjectId}
        />
      ) : (
        user && (
          <Button
            onClick={() => showCreateTaskForm()}
            className="btn mt-10 "
            text="Add Task"
          />
        )
      )}
      {/* {diditElements} */}
    </div>
  );
}

export default App;

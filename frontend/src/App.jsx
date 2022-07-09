import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Task from "./components/Task";
import Didit from "./components/Didit";
import TaskForm from "./components/TaskForm";
import ProjectForm from "./components/ProjectForm";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Button from "./components/UI/Button";
import ErrorMessage from "./components/UI/ErrorMessage";
import taskService from "./services/tasks";
import projectService from "./services/projects";
import diditService from "./services/didits";
import alertService from "./services/alerts";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [didits, setDidits] = useState([]);
  const [diditTitle, setDiditTitle] = useState("");
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  const [addProject, setAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  //shows or hides the register form
  //look for a better solution to this
  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

  //function to show create task form
  const showCreateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setAddTask((prevVal) => !prevVal);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //function to show create project form
  const showCreateProjectForm = () => {
    setProjectTitle("");
    setAddProject((prevVal) => !prevVal);
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //function to hide create task form
  const hideCreateTaskForm = (e) => {
    e.preventDefault();
    setAddTask((prevVal) => !prevVal);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate(new Date());
  };

  //function to hide create project form
  const hideCreateProjectForm = (e) => {
    e.preventDefault();
    setAddProject((prevVal) => !prevVal);
    setProjectTitle("");
  };

  //function to create tasks from submission of form event
  //posts to db with helper function and adds new task to UI
  const handleCreateTask = async (e) => {
    try {
      e.preventDefault();

      const newTask = await taskService.createTasks({
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        isChecked: false,
        isEditing: false,
        project: projectId,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate(new Date());
      setProjectId("");
      setTasks((prevTasks) => prevTasks.concat(newTask));
      showCreateTaskForm();
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
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
  const showUpdateTaskForm = (id) => {
    const projectId = tasks.filter((task) => task.id === id)[0].project;
    setProjectTitle(projects.filter((task) => task.id === projectId)[0].title);
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

  //function to hide task form for editing task
  //resets form fields on cancel
  const hideUpdateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate(new Date());
    setProjectTitle("");
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
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

  //function to update tasks from submission of form event
  //puts to db with helper function and updates task in UI
  const handleUpdateTask = async (e, id) => {
    try {
      e.preventDefault();
      const updatedTask = tasks.filter((task) => task.id === id)[0];
      //move these into taskservice function
      updatedTask.title = taskTitle;
      updatedTask.description = taskDescription;
      updatedTask.dueDate = taskDueDate;
      updatedTask.isEditing = false;
      updatedTask.project = projectId;
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
                project: projectId,
              }
            : task
        )
      );
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate(new Date());
      setProjectId("");
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  //function to update if a task has been completed
  //sets completedOn date and updates UI to show strikethrough task
  const handleUpdateCheck = async (id) => {
    try {
      const currentDate = new Date();
      const updatedTask = tasks.filter((task) => task.id === id)[0];
      await taskService.updateTasks({
        ...updatedTask,
        isChecked: !updatedTask.isChecked,
        completedOn: currentDate,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, isChecked: !task.isChecked, completedOn: currentDate }
            : task
        )
      );
    } catch (error) {
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
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

  //function to delete tasks from submission of form event
  //deletes to db with helper function and updates task in UI
  //before deleting, a didit is created from task object and posted with helper
  const handleDeleteTask = async (id) => {
    try {
      const deletedTask = tasks.filter((task) => task.id === id)[0];
      const newDidit = await diditService.createDidits(
        { ...deletedTask },
        user
      );

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

  //map out tasks into Task Components and on edit switch out for Task Form
  const taskElements = tasks.map((task) =>
    task.isEditing ? (
      <TaskForm
        key={task.id}
        id={task.id}
        titleValue={taskTitle}
        descriptionValue={taskDescription || task.description}
        dueDate={taskDueDate}
        onSubmit={(e) => handleUpdateTask(e, task.id)}
        onTitleChange={(e) => setTaskTitle(e.target.value)}
        onDescriptionChange={(e) => setTaskDescription(e.target.value)}
        onDueDate={setTaskDueDate}
        onClick={hideUpdateTaskForm}
        projects={projects}
        projectTitle={projectTitle}
        projectId={projectId}
        onProjectId={setProjectId}
        submitText="save"
      />
    ) : (
      <Task
        checked={task.isChecked}
        onCheck={handleUpdateCheck}
        onDelete={handleDeleteTask}
        onUpdate={showUpdateTaskForm}
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        key={task.id}
        id={task.id}
      />
    )
  );

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
      {user && taskElements}
      {user && addTask ? (
        <TaskForm
          onSubmit={(e) => handleCreateTask(e)}
          titleValue={taskTitle}
          descriptionValue={taskDescription}
          dueDate={taskDueDate}
          onTitleChange={(e) => setTaskTitle(e.target.value)}
          onDescriptionChange={(e) => setTaskDescription(e.target.value)}
          onDueDate={setTaskDueDate}
          onClick={hideCreateTaskForm}
          projects={projects}
          projectTitle={projectTitle}
          projectId={projectId}
          onProjectId={setProjectId}
          submitText="add"
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

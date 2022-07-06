import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Task from "./components/Task";
import Didit from "./components/Didit";
import CreateTaskForm from "./components/CreateTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import CreateProjectForm from "./components/CreateProjectForm";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import taskService from "./services/tasks";
import projectService from "./services/projects";
import diditService from "./services/didits";

import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [didits, setDidits] = useState([]);
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

  //look for a better solution to this
  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

  //button to show create task form
  const showCreateTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setAddTask((prevVal) => !prevVal);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  const showCreateProjectForm = () => {
    setProjectTitle("");
    setAddProject((prevVal) => !prevVal);
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //button to hide create task form
  const hideCreateTaskForm = (e) => {
    e.preventDefault();
    setAddTask((prevVal) => !prevVal);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate(new Date());
  };

  const hideCreateProjectForm = (e) => {
    e.preventDefault();
    setAddProject((prevVal) => !prevVal);
    setProjectTitle("");
  };

  //function to create tasks
  const handleCreateTask = async (e) => {
    try {
      e.preventDefault();
      console.log(e);
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
    setTaskDueDate(new Date());
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isEditing: false }))
    );
  };

  //button to show task form for editing task
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

  //button to hide task form for editing task
  const hideUpdateProjectForm = () => {
    setProjectTitle("");
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
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

  //function to update tasks
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

  //function to handle deleting a task and posting to didits
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

  const handleDeleteProject = async (e, id) => {
    e.stopPropagation();
    const deletedProject = projects.filter((project) => project.id === id)[0];
    const alert = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: `Project ${deletedProject.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (alert) {
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
      } catch (error) {
        setSystemMessage("System encountered an error");
        setTimeout(() => {
          setSystemMessage(null);
        }, 3000);
      }
      await Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
        dueDate={taskDueDate}
        onTaskUpdate={handleUpdateTask}
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onDueDate={setTaskDueDate}
        cancel={hideUpdateTaskForm}
        projects={projects}
        projectId={projectId}
        onProjectId={setProjectId}
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

  const diditElements = didits.map((didit) => (
    <Didit
      title={didit.title}
      description={didit.description}
      date={didit.date}
      key={didit.id}
      id={didit.id}
    />
  ));

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
      {user && (
        <Menu
          tasks={tasks}
          projects={projects}
          title={projectTitle}
          onTitleChange={setProjectTitle}
          onProjectUpdate={handleUpdateProject}
          onUpdate={showUpdateProjectForm}
          cancel={hideUpdateProjectForm}
          onDelete={handleDeleteProject}
        >
          {addProject ? (
            <CreateProjectForm
              onProjectCreation={handleCreateProject}
              title={projectTitle}
              onTitleChange={setProjectTitle}
              cancel={hideCreateProjectForm}
            />
          ) : (
            user && (
              <button
                onClick={() => showCreateProjectForm()}
                className="btn mt-10 "
              >
                Add Project
              </button>
            )
          )}
        </Menu>
      )}
      {user && taskElements}
      {user && addTask ? (
        <CreateTaskForm
          onTaskCreation={handleCreateTask}
          title={taskTitle}
          description={taskDescription}
          dueDate={taskDueDate}
          onTitleChange={setTaskTitle}
          onDescriptionChange={setTaskDescription}
          onDueDate={setTaskDueDate}
          cancel={hideCreateTaskForm}
          projectId={projectId}
          onProjectId={setProjectId}
        />
      ) : (
        user && (
          <button onClick={() => showCreateTaskForm()} className="btn mt-10 ">
            Add Task
          </button>
        )
      )}
      {/* {diditElements} */}
    </div>
  );
}

export default App;

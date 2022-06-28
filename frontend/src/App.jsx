import { useEffect, useState } from "react";
import Register from "./components/register";
import Login from "./components/Login";
import Task from "./components/Task";
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

  const handleRegistration = async (e) => {
    e.preventDefault();
    await registrationService.register({
      username,
      email,
      password,
    });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleNewUser = () => {
    setNewUser((prevVal) => !prevVal);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedIn", JSON.stringify(user));
    taskService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  const taskElements = tasks.map((task) => (
    <Task title={task.title} key={task.id} />
  ));

  useEffect(() => {
    const getTasks = async () => {
      const response = await taskService.getTasks();
      setTasks(response);
    };
    getTasks();
  }, []);

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
    </div>
  );
}

export default App;

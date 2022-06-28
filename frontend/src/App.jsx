import { useEffect, useState } from "react";
import Login from "./components/Login";
import Task from "./components/Task";
import Navbar from "./components/Navbar";
import loginService from "./services/login";
import taskService from "./services/tasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    taskService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
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

  return (
    <div className="App">
      <Navbar user={user} />
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

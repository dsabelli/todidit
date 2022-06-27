import { useState } from "react";
import Login from "./components/Login";
import loginService from "./services/login";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    await loginService.login({ username, password });
  };

  return (
    <div className="App">
      <Login
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;

import { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";

import taskService from "./services/tasks";

import All from "./pages/All";
import { UserContext } from "./components/context/UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  //Logs user out of current session
  const handleLogout = () => {
    // navigate("/");
    window.localStorage.clear();
  };

  //Checks if a user's token is stored in local storage
  //If it is, re-login is not required and token is parsed and set for use

  return (
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
  );
}

export default App;

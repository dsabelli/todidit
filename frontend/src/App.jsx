import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Unprotected/Landing";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Unprotected/Register";
import Login from "./pages/Unprotected/Login";
import Index from "./pages/Index";
import All from "./pages/Protected/All";
import Today from "./pages/Today";
import Week from "./pages/Week";
import Project from "./pages/Project";
import Didit from "./pages/Didit";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { UserContext } from "./components/context/UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/app" element={<Index />}>
            <Route path="all" element={<All />} />
            <Route path="today" element={<Today />} />
            <Route path="week" element={<Week />} />
            <Route path="project/:id" element={<Project />} />
            <Route path="didit/:id" element={<Didit />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

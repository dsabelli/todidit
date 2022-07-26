import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Unprotected/Landing";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Unprotected/Register";
import Login from "./pages/Unprotected/Login";
import Home from "./pages/Protected/Home";
import All from "./pages/Protected/All";
import Today from "./pages/Protected/Today";
import Week from "./pages/Protected/Week";
import Important from "./pages/Protected/Important";
import Project from "./pages/Protected/Project";
import ArchivedProject from "./pages/Protected/ArchivedProject";
import Didits from "./pages/Protected/Didits";
import Profile from "./pages/Protected/Profile";
import Settings from "./pages/Protected/Settings";
import Error from "./pages/Unprotected/Error";
import Verified from "./pages/Unprotected/Verified";
import ResetPassword from "./pages/Unprotected/ResetPassword";
import ConfirmReset from "./pages/Unprotected/ConfirmReset";
import { UserContext } from "./context/UserContext";
import { DateFormatContext } from "./context/DateFormatContext";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [dateFormat, setDateFormat] = useState(null);
  const dateFormatValue = useMemo(
    () => ({ dateFormat, setDateFormat }),
    [dateFormat, setDateFormat]
  );

  return (
    <UserContext.Provider value={userValue}>
      <DateFormatContext.Provider value={dateFormatValue}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="reset-password/:token" element={<ConfirmReset />} />
          <Route path="verify/:token" element={<Verified />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/app" element={<Home />}>
              <Route index element={<div>There's nothing here!</div>} />
              <Route path="all" element={<All />} />
              <Route path="today" element={<Today />} />
              <Route path="week" element={<Week />} />
              <Route path="important" element={<Important />} />
              <Route path="project/:id" element={<Project />} />
              <Route
                path="project/archived/:id"
                element={<ArchivedProject />}
              />
              <Route path="didit/:id" element={<Didits />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </DateFormatContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

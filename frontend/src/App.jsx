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
import Completed from "./pages/Protected/Completed";
import Project from "./pages/Protected/Project";
import ArchivedProject from "./pages/Protected/ArchivedProject";
import Didits from "./pages/Protected/Didits";
import Profile from "./pages/Protected/Profile";
import Settings from "./pages/Protected/Settings";
import Error from "./pages/Unprotected/Error";
import Verified from "./pages/Unprotected/Verified";
import ResetPassword from "./pages/Unprotected/ResetPassword";
import ConfirmReset from "./pages/Unprotected/ConfirmReset";
import Privacy from "./pages/Unprotected/Privacy";
import Contact from "./pages/Unprotected/Contact";
import Terms from "./pages/Unprotected/Terms";
import { UserContext } from "./context/UserContext";
import { DateFormatContext } from "./context/DateFormatContext";
import { SettingsContext } from "./context/SettingsContext";
import { Theme } from "react-daisyui";
import { getHours } from "date-fns";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [dateFormat, setDateFormat] = useState("MM-dd-yyyy");
  const dateFormatValue = useMemo(
    () => ({ dateFormat, setDateFormat }),
    [dateFormat, setDateFormat]
  );
  const dateHours = getHours(new Date());
  const [theme, setTheme] = useState(
    dateHours > 7 && dateHours < 17 ? "light" : "dark"
  );

  const [settings, setSettings] = useState({});
  const settingsValue = useMemo(
    () => ({ settings, setSettings }),
    [settings, setSettings]
  );

  return (
    <Theme dataTheme={theme}>
      <UserContext.Provider value={userValue}>
        <SettingsContext.Provider value={settingsValue}>
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
                <Route
                  path="settings"
                  element={<Settings theme={theme} onTheme={setTheme} />}
                />
                <Route path="/app" element={<Home onTheme={setTheme} />}>
                  <Route index element={<div>There's nothing here!</div>} />
                  <Route path="all" element={<All />} />
                  <Route path="today" element={<Today />} />
                  <Route path="week" element={<Week />} />
                  <Route path="important" element={<Important />} />
                  <Route path="completed" element={<Completed />} />
                  <Route path="project/:id" element={<Project />} />
                  <Route
                    path="project/archived/:id"
                    element={<ArchivedProject />}
                  />
                  <Route path="didit/:id" element={<Didits />} />
                </Route>
              </Route>
              <Route path="contact" element={<Contact />} />
              <Route path="terms-of-service" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </DateFormatContext.Provider>
        </SettingsContext.Provider>
      </UserContext.Provider>
    </Theme>
  );
}

export default App;

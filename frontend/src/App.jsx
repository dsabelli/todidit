import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { getHours } from "date-fns";
import { Theme } from "react-daisyui";
import { ErrorBoundary } from "react-error-boundary";
import IndexRouteSvg from "./Assets/SVGs/IndexRouteSvg";
import { DateFormatContext } from "./context/DateFormatContext";
import { SettingsContext } from "./context/SettingsContext";
import { UserContext } from "./context/UserContext";
import All from "./pages/Protected/All";
import ArchivedProject from "./pages/Protected/ArchivedProject";
import Completed from "./pages/Protected/Completed";
import Didits from "./pages/Protected/Didits";
import Home from "./pages/Protected/Home";
import Important from "./pages/Protected/Important";
import Notes from "./pages/Protected/Notes";
import Profile from "./pages/Protected/Profile";
import Project from "./pages/Protected/Project";
import Settings from "./pages/Protected/Settings";
import TimeMachine from "./pages/Protected/TimeMachine";
import Today from "./pages/Protected/Today";
import Week from "./pages/Protected/Week";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ConfirmReset from "./pages/Unprotected/ConfirmReset";
import Contact from "./pages/Unprotected/Contact";
import Error from "./pages/Unprotected/Error";
import Landing from "./pages/Unprotected/Landing";
import Login from "./pages/Unprotected/Login";
import NotFound from "./pages/Unprotected/NotFound";
import Privacy from "./pages/Unprotected/Privacy";
import Register from "./pages/Unprotected/Register";
import ResetPassword from "./pages/Unprotected/ResetPassword";
import Terms from "./pages/Unprotected/Terms";
import Verified from "./pages/Unprotected/Verified";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [dateFormat, setDateFormat] = useState("MMM-dd-yyyy");
  const dateFormatValue = useMemo(
    () => ({ dateFormat, setDateFormat }),
    [dateFormat, setDateFormat]
  );
  const dateHours = getHours(new Date());
  const [theme, setTheme] = useState(
    dateHours > 6 && dateHours < 18 ? "light" : "dark"
  );

  const [settings, setSettings] = useState({});
  const settingsValue = useMemo(
    () => ({ settings, setSettings }),
    [settings, setSettings]
  );

  return (
    <Theme dataTheme={theme}>
      <ErrorBoundary
        FallbackComponent={Error}
        onError={(error, errorInfo) => console.log({ error, errorInfo })}
      >
        <UserContext.Provider value={userValue}>
          <SettingsContext.Provider value={settingsValue}>
            <DateFormatContext.Provider value={dateFormatValue}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route
                  path="reset-password/:token"
                  element={<ConfirmReset />}
                />
                <Route path="verify/:token" element={<Verified />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="settings"
                    element={<Settings theme={theme} onTheme={setTheme} />}
                  />
                  <Route path="/app" element={<Home onTheme={setTheme} />}>
                    <Route
                      index
                      element={
                        <div className="mt-8">
                          <IndexRouteSvg />
                        </div>
                      }
                    />
                    <Route path="all" element={<All />} />
                    <Route path="today" element={<Today />} />
                    <Route path="week" element={<Week />} />
                    <Route path="important" element={<Important />} />
                    <Route path="completed" element={<Completed />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="project/:id" element={<Project />} />
                    <Route
                      path="project/archived/:id"
                      element={<ArchivedProject />}
                    />
                    <Route path="didit/:id" element={<Didits />} />
                    <Route
                      path="time-machine/:date"
                      element={<TimeMachine />}
                    />
                  </Route>
                </Route>
                <Route path="contact" element={<Contact />} />
                <Route path="terms-of-service" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DateFormatContext.Provider>
          </SettingsContext.Provider>
        </UserContext.Provider>
      </ErrorBoundary>
    </Theme>
  );
}

export default App;

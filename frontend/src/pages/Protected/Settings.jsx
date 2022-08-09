import { useState, useEffect, useContext, useId } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { DateFormatContext } from "../../context/DateFormatContext";
import { UserContext } from "../../context/UserContext";
import taskService from "../../services/tasks";
import { Link } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import UNavbar from "../../layouts/UNavbar";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import settingsService from "../../services/settings";
import userService from "../../services/users";
import SettingsSvg from "../../Assets/SVGs/SettingsSvg";

const Settings = ({ theme, onTheme }) => {
  const { user, setUser } = useContext(UserContext);
  const { settings } = useContext(SettingsContext);
  const { dateFormat, setDateFormat } = useContext(DateFormatContext);
  const [loaded, setLoaded] = useState(false);

  //function to grab different date format strings.
  const dateFormats = settingsService.getDates();
  const themes = settingsService.getThemes();

  //map out settings to options to select.
  const dateOptions = dateFormats.map((date) => (
    <option key={useId()}>{date}</option>
  ));

  const themeOptions = themes.map((theme) => (
    <option key={useId()}>{theme}</option>
  ));

  //functions to set selected settings in state. User can still cancel change.
  const handleSelectDate = (date) => {
    setDateFormat(date);
  };

  const handleSelectTheme = (theme) => {
    onTheme(theme);
  };

  //function to update backend with changed date format
  const handleUserUpdate = async () => {
    await userService.updateUser(
      { settings: { ...settings, dateFormat: dateFormat, theme: theme } },
      user
    );
  };

  //check localStorage for token between unnested routes
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
      // setLoaded(true);
      setTimeout(() => {
        setLoaded(true);
      }, 400);
    }
  }, []);

  return loaded ? (
    <>
      <UNavbar username={user.username} />
      <div
        className={
          "flex flex-col md:flex-row px-10 mt-6 md:justify-between h-screen "
        }
      >
        <div className="max-w-md md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold mb-5">Account Settings</h1>
          <p className="text-lg font-bold">Date Format</p>
          <div>
            <Select
              className="m-2"
              onChange={(e) => handleSelectDate(e.target.value)}
              defaultValue={dateFormat || "Select"}
            >
              {dateOptions}
            </Select>
          </div>
          {/* change to timezone */}
          <p className="text-lg font-bold">Themes</p>
          <div>
            <Select
              className="m-2"
              onChange={(e) => handleSelectTheme(e.target.value.toLowerCase())}
              defaultValue={
                theme
                  ? theme.slice(0, 1).toUpperCase() + theme.slice(1)
                  : "Select"
              }
            >
              {themeOptions}
            </Select>
          </div>

          <div className="self-end flex gap-2 mt-4">
            <Link to="/app/today">
              <Button text="cancel" className="btn-sm " />
            </Link>
            <Link to="/app/today">
              <Button
                text="save"
                className="btn-sm btn-accent text-accent-content"
                onClick={() => handleUserUpdate(user)}
              />
            </Link>
          </div>
        </div>
        <SettingsSvg
          className={" md:mx-auto mt-16 pl-4 md:pl-0 max-w-md md:w-2/5 "}
        />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Settings;

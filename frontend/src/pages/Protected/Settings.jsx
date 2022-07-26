import { useState, useEffect, useContext, useId } from "react";
import { DateFormatContext } from "../../context/DateFormatContext";
import { UserContext } from "../../context/UserContext";
import taskService from "../../services/tasks";
import { Link } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import Navbar from "../../layouts/Navbar";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import dateService from "../../services/dates";
import userService from "../../services/users";
import SettingsSvg from "../../Assets/SVGs/SettingsSvg";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const { dateFormat, setDateFormat } = useContext(DateFormatContext);
  const [loaded, setLoaded] = useState(false);
  const [selectedDateFormat, setSelectedDateFormat] = useState("");

  //function to grab different date format strings.
  const dateFormats = dateService.getDates();

  //function to set selected date in state. User can still cancel change.
  const handleSelect = (date) => {
    setSelectedDateFormat(date);
  };

  //function to update backend and frontend with changed date format
  const handleUserUpdate = async (selectedDateFormat, user) => {
    await userService.updateUser({ dateFormat: selectedDateFormat }, user);
    setDateFormat(selectedDateFormat);
  };

  //map out date format strings to options to select.
  const dateOptions = dateFormats.map((date) => (
    <option key={useId()}>{date}</option>
  ));

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
      <Navbar />
      <div
        className={
          "flex px-10 mt-6 justify-center md:justify-between h-screen "
        }
      >
        <div className="max-w-md md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-bold mb-5">Account Settings</h1>
          <p className="text-lg font-bold">Date Format</p>
          <div>
            <Select
              className="m-2"
              onChange={(e) => handleSelect(e.target.value)}
              defaultValue="Select a date format"
            >
              {dateOptions}
            </Select>
          </div>
          {/* change to timezone */}
          {/* <p className="text-lg font-bold">Time Zone</p>
          <div>
            <Select
              className="m-2"
              onChange={(e) => handleSelect(e.target.value)}
              defaultValue="Select a date format"
            >
              {dateOptions}
            </Select>
          </div> */}

          <div className="self-end flex gap-2 mt-4">
            <Link to="/app/today">
              <Button text="cancel" className="btn-sm " />
            </Link>
            <Link to="/app/today">
              <Button
                text="save"
                className="btn-sm"
                onClick={() => handleUserUpdate(selectedDateFormat, user)}
              />
            </Link>
          </div>
        </div>
        <SettingsSvg className={" mx-auto mt-16 w-2/5 hidden md:block"} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Settings;

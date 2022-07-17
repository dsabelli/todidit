import { useState, useContext, useId } from "react";
import { DateFormatContext } from "../../components/context/DateFormatContext";
import { UserContext } from "../../components/context/UserContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import dateService from "../../services/dates";
import userService from "../../services/users";
const Settings = () => {
  const { user } = useContext(UserContext);
  const { setDateFormat } = useContext(DateFormatContext);
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

  return (
    <>
      <Navbar notApp={true} />
      <h1>Account Settings</h1>
      <div>
        <Select
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue="Select a date format"
        >
          {dateOptions}
        </Select>
        <Link to="/app/all">
          <Button
            text="save"
            onClick={() => handleUserUpdate(selectedDateFormat, user)}
          />
        </Link>
        <Link to="/app/all">
          <Button text="cancel" />
        </Link>
      </div>
    </>
  );
};

export default Settings;

import { useEffect, useContext, useId } from "react";
import { DateFormatContext } from "../../components/context/DateFormatContext";
import { UserContext } from "../../components/context/UserContext";
import Navbar from "../../components/Navbar";
import Button from "../../components/UI/Button";
import dateService from "../../services/dates";
import userService from "../../services/users";
const Settings = () => {
  const { user } = useContext(UserContext);
  const { dateFormat, setDateFormat } = useContext(DateFormatContext);
  const dateFormats = dateService.getDates();

  useEffect(() => {
    const getUserSettings = async () => {
      const response = await userService.getUser(user || "");
      setDateFormat(response.dateFormat);
    };
    getUserSettings();
  }, [user]);

  let selectedDateFormat;

  const handleUserUpdate = async (selectedDateFormat, user) => {
    await userService.updateUser({ dateFormat: selectedDateFormat }, user);
    setDateFormat(selectedDateFormat);
  };

  const dateOptions = dateFormats.map((date) => (
    <option key={useId()}>{date}</option>
  ));
  console.log(dateFormat);
  return (
    <>
      <Navbar notApp={true} />
      <div>
        Set date format:
        <select onChange={(e) => (selectedDateFormat = e.target.value)}>
          {dateOptions}
        </select>
        <Button
          text="save"
          onClick={() => handleUserUpdate(selectedDateFormat, user)}
        />
        <Button text="cancel" />
      </div>
    </>
  );
};

export default Settings;

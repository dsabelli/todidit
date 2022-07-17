import { useContext, useId } from "react";
import { DateFormatContext } from "../../components/context/DateFormatContext";
import Navbar from "../../components/Navbar";
import dateService from "../../services/dates";
const Settings = () => {
  const { dateFormat, setDateFormat } = useContext(DateFormatContext);
  const dateFormats = dateService.getDates();

  const dateOptions = dateFormats.map((date) => (
    <option key={useId()}>{date}</option>
  ));
  console.log(dateFormat);
  return (
    <>
      <Navbar notApp={true} />
      <div>
        Set date format:
        <select onChange={(e) => setDateFormat(e.target.value)}>
          {dateOptions}
        </select>
      </div>
    </>
  );
};

export default Settings;

import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Dropdown from "../../components/UI/Dropdown";
import { DateFormatContext } from "../../context/DateFormatContext";
const DueDate = ({ dueDate, onDueDate, className }) => {
  const { dateFormat } = useContext(DateFormatContext);

  return (
    <Dropdown className={className} text={format(dueDate, dateFormat)}>
      <DatePicker selected={dueDate} onChange={(e) => onDueDate(e)} inline />
    </Dropdown>
  );
};

export default DueDate;

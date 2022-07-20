import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Button from "../../components/UI/Button";
import { DateFormatContext } from "../../context/DateFormatContext";
const DueDate = ({ dueDate, onDueDate }) => {
  const { dateFormat } = useContext(DateFormatContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);

    onDueDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleClick} text={format(dueDate, dateFormat)} />
      {isOpen && (
        <DatePicker selected={dueDate} onChange={handleChange} inline />
      )}
    </>
  );
};

export default DueDate;

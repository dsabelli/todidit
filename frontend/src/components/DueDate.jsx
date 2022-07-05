import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DueDate = ({ dueDate, onDueDate }) => {
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
      <button className="btn" onClick={handleClick}>
        {format(dueDate, "dd-MM-yyyy")}
      </button>
      {isOpen && (
        <DatePicker selected={dueDate} onChange={handleChange} inline />
      )}
    </>
  );
};

export default DueDate;

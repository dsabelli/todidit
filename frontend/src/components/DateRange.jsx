import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({ onDiditDateStart, onDiditDateEnd }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => (setStartDate(date), onDiditDateStart(date))}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="btn w-28 text-xs"
        value={startDate ? startDate : "Start Date"}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => (
          date.setHours(23, 59, 59), setEndDate(date), onDiditDateEnd(date)
        )}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        className="btn w-28 text-xs"
        value={endDate ? endDate : "End Date"}
      />
    </>
  );
};
export default DateRange;

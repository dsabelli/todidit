import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, endOfDay } from "date-fns";
const DateRange = ({ onDiditDateStart, onDiditDateEnd }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //update state via props and useEffect when selecting from datepicker
  useEffect(() => {
    const getStartDate = () => {
      startDate
        ? onDiditDateStart(startOfDay(startDate))
        : onDiditDateStart("");
    };
    getStartDate();
  }, [startDate]);

  useEffect(() => {
    const getEndDate = () => {
      endDate ? onDiditDateEnd(endOfDay(endDate)) : onDiditDateEnd("");
    };
    getEndDate();
  }, [endDate]);

  return (
    <div className="w-44 md:48 ">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDateRange(update)}
        className="w-full text-2xs md:text-xs btn pl-1"
        isClearable={true}
        value={startDate && endDate ? startDate : "Select Dates"}
        popperPlacement="bottom-end"
      />
    </div>
  );
};

export default DateRange;

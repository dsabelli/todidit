import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, endOfDay, format } from "date-fns";
import { DateFormatContext } from "../../context/DateFormatContext";

const DateRange = ({ onDiditDateStart, onDiditDateEnd }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const { dateFormat } = useContext(DateFormatContext);

  //since input values caanot be wrapped, shorten value depending on user's date format
  const dateFormatValue =
    dateFormat === "MMM-dd-yyyy" || dateFormat === "MM-dd-yyyy"
      ? "MM-dd-yy"
      : dateFormat === "dd-MMM-yyyy" || dateFormat === "dd-MM-yyyy"
      ? "dd-MM-yy"
      : dateFormat;
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
    <div className="w-40 md:w-48">
      <DatePicker
        wrapperClassName=""
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDateRange(update)}
        className="w-full text-xs md:text-sm btn pl-1"
        isClearable={true}
        value={
          startDate && endDate
            ? `${format(startDate, dateFormatValue)} - ${format(
                endDate,
                dateFormatValue
              )}`
            : "Select Dates"
        }
        popperPlacement="bottom-end"
      />
    </div>
  );
};

export default DateRange;

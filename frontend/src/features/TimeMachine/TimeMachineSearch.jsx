import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import { startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import diditService from "../../services/didits";
import { TimeMachineContext } from "../../context/TimeMachineContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const TimeMachineSearch = ({}) => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { timeMachineTasks, setTimeMachineTasks } =
    useContext(TimeMachineContext);
  const [timeMachineDate, setTimeMachineDate] = useState(new Date());

  //api call with state and debounced string query state.
  //queries on change of date or debounced string.
  useEffect(() => {
    const getDidits = async () => {
      const searchedDidits = await diditService.getTimeMachineTasks(
        startOfDay(timeMachineDate),
        user
      );

      timeMachineDate && setTimeMachineTasks(searchedDidits);
    };
    getDidits();
  }, [timeMachineDate]);

  return (
    <DatePicker
      maxDate={new Date()}
      inline
      className="bg-inherit cursor-pointer"
      onChange={(date) => (
        setTimeMachineDate(date),
        navigate(`/app/time-machine/${date.toISOString()}`)
      )}
    />
  );
};

export default TimeMachineSearch;

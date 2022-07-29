import { useContext, useId, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { UserContext } from "../context/UserContext";
import SlidersIcon from "../Assets/Icons/SlidersIcon";
import FilterIcon from "../Assets/Icons/FilterIcon";
import GridIcon from "../Assets/Icons/GridIcon";
import { ArrowIconUp, ArrowIconDown } from "../Assets/Icons/ArrowIcons";
import Select from "../components/UI/Select";
import Modal from "../components/UI/Modal";
import userService from "../services/users";
import settingService from "../services/settings";
import { useNavigate, useLocation } from "react-router-dom";

const SortButton = ({
  sortBy,
  onSortBy,
  order,
  onOrder,
  tasks,
  onTasks,
  onAllTasks,
}) => {
  let location = useLocation();
  let navigate = useNavigate();
  const { settings, setSettings } = useContext(SettingsContext);
  const { user } = useContext(UserContext);

  //functions to get settings and options
  const sortBySettings = settingService.getSortBySettings();
  const sortByOptions = settingService.getSortByOptions();
  const orderOptions = settingService.getOrderOptions();

  //map out settings to options to select.
  const sortByOptionsEls = sortByOptions.map((option) => (
    <option key={useId()}>{option}</option>
  ));
  const orderOptionsEls = orderOptions.map((option) => (
    <option key={useId()}>{option}</option>
  ));

  //callback function for sort
  const compareAscending = (a, b) => {
    //check if sortBy is boolean (property starts with is, see user model)
    //if it is, reverse sorts, otherwise regular sorts
    let sorted = sortBy.includes("is");
    if (sorted)
      return b[sortBy] > a[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0;
    return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
  };

  //opposite of above function for descending order
  const compareDescending = (a, b) => {
    let sorted = sortBy.includes("is");
    if (sorted)
      return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
    return b[sortBy] > a[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0;
  };

  //matches the selected option to the backend key
  //and sets state to proper value
  const handleSelectSortBy = (sortByOption) => {
    let index = sortByOptions.indexOf(sortByOption);
    onSortBy(sortBySettings[index]);
  };

  //sets order
  const handleSelectOrder = (order) => {
    onOrder(order);
  };

  //updates the backend settings and updates all current task views in frontend
  const handleUserUpdate = async () => {
    //update user settings in backend
    await userService.updateUser(
      { settings: { ...settings, sortBy, order } },
      user
    );

    //check whether order is ascending or not and use one
    //of the callback functions below to sort
    onTasks((prevTasks) =>
      order === "ascending"
        ? prevTasks.sort(compareAscending)
        : prevTasks.sort(compareDescending)
    );
    onAllTasks((prevTasks) =>
      order === "ascending"
        ? prevTasks.sort(compareAscending)
        : prevTasks.sort(compareDescending)
    );
    setSettings((prevSettings) => ({
      ...prevSettings,
      sortBy,
      order,
    }));
  };

  //sorts tasks on initial pageload and when tasks change
  useEffect(() => {
    onTasks((prevTasks) =>
      order === "ascending"
        ? prevTasks.sort(compareAscending)
        : prevTasks.sort(compareDescending)
    );
    onAllTasks((prevTasks) =>
      order === "ascending"
        ? prevTasks.sort(compareAscending)
        : prevTasks.sort(compareDescending)
    );
    navigate(location.pathname);
  }, [tasks]);

  return (
    <div className="tooltip tooltip-left" data-tip="Sort">
      <Modal
        className="self-center"
        openTitle="Sort"
        title={<SlidersIcon className="w-6 " />}
      >
        <div className="flex flex-col">
          <div className="flex gap-2 mb-2 items-center">
            <GridIcon className="w-5" />
            <p>Sort by</p>
          </div>
          <Select
            defaultValue={sortByOptions[sortBySettings.indexOf(sortBy)]}
            className="text-sm mb-4"
            onChange={(e) => handleSelectSortBy(e.target.value)}
          >
            {sortByOptionsEls}
          </Select>
          <div className="flex items-center mb-2">
            <ArrowIconDown className="w-5" />
            <ArrowIconUp className="w-5" />
            <p className="ml-2">Order</p>
          </div>
          <Select
            defaultValue={order.slice(0, 1).toUpperCase() + order.slice(1)}
            className="text-sm mb-4"
            onChange={(e) => handleSelectOrder(e.target.value.toLowerCase())}
          >
            {orderOptionsEls}
          </Select>
          <div className="flex gap-2 justify-end">
            <label
              htmlFor="my-modal-4"
              className="btn btn-sm btn-bg-neutral text-neutral-content modal-button "
            >
              Cancel
            </label>

            <label
              htmlFor="my-modal-4"
              className="btn btn-accent text-accent-content btn-sm modal-button"
              onClick={() => handleUserUpdate()}
            >
              Save
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SortButton;

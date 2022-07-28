import React from "react";
import SlidersIcon from "../Assets/Icons/SlidersIcon";
import FilterIcon from "../Assets/Icons/FilterIcon";
import GridIcon from "../Assets/Icons/GridIcon";
import { ArrowIconUp, ArrowIconDown } from "../Assets/Icons/ArrowIcons";
import Select from "../components/UI/Select";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";

const SortButton = ({}) => {
  return (
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
        <Select defaultValue="Default" className="text-sm mb-4">
          <option>Due Date</option>
          <option>Date Added</option>
          <option>Importance</option>
          <option>Alphabetically</option>
        </Select>
        <div className="flex items-center mb-2">
          <ArrowIconDown className="w-5" />
          <ArrowIconUp className="w-5" />
          <p className="ml-2">Order</p>
        </div>
        <Select defaultValue="Default" className="text-sm mb-4">
          <option>Ascending</option>
          <option>Descending</option>
        </Select>

        <Button className="btn-sm btn-success self-end">Save</Button>
      </div>
    </Modal>
  );
};

export default SortButton;

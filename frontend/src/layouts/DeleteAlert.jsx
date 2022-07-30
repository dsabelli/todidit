import React from "react";
import Modal from "../components/UI/Modal";

const DeleteAlert = ({
  onClick,
  openButton,
  modalTitle,
  modalIcon,
  openButtonClass,
}) => {
  return (
    <Modal
      className="self-center"
      modalIcon={modalIcon}
      modalTitle={`Are you sure you want to delete ${modalTitle}?`}
      openButton={openButton}
      openButtonClass={openButtonClass}
    >
      <div className="flex flex-col mt-4">
        <div className="flex gap-2 justify-center">
          <label
            htmlFor="my-modal-4"
            className="btn w-20 btn-bg-neutral hover:bg-neutral text-neutral-content modal-button"
          >
            Cancel
          </label>

          <label
            onClick={onClick}
            htmlFor="my-modal-4"
            className="btn w-20 btn-success text-bg-base-100 modal-button"
          >
            Yes
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlert;

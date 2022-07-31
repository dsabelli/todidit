import React from "react";

const Modal = ({
  openButton,
  children,
  modalIcon,
  modalTitle,
  openButtonClass,
  modalTitleClass,
  modalId,
}) => {
  return (
    <>
      {/* button to open modal */}
      <label
        htmlFor={`my-modal-${modalId}`}
        className={`btn modal-button ${
          openButtonClass ? openButtonClass : "btn-ghost"
        }`}
      >
        {openButton}
      </label>

      <input
        type="checkbox"
        id={`my-modal-${modalId}`}
        className="modal-toggle"
      />
      {/* modal body */}
      <label htmlFor={`my-modal-${modalId}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor={`my-modal-${modalId}`}>
          {/* icon, if one, at top of modal.  */}
          <div>{modalIcon}</div>
          {/* open modal title */}
          <h3 className={`text-2xl font-bold text-center ${modalTitleClass}`}>
            {modalTitle}
          </h3>
          <div className="py-4">{children}</div>
        </label>
      </label>
    </>
  );
};

export default Modal;

import React from "react";

const Modal = ({ title, children }) => {
  return (
    <>
      <label htmlFor="my-modal-4" className="btn modal-button">
        {title}
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Didit details</h3>
          <div className="py-4">{children}</div>
        </label>
      </label>
    </>
  );
};

export default Modal;

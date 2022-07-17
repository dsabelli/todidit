import React from "react";
import { useNavigate } from "react-router-dom";
const Modal = ({ title, children, checked, onChange }) => {
  let navigate = useNavigate();
  return (
    <>
      <label htmlFor="my-modal-3" className="btn modal-button">
        {title}
      </label>

      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        defaultChecked
      />
      <div onChange={onChange} className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Profile</h3>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;

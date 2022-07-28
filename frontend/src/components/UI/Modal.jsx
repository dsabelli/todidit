import React from "react";
import { useNavigate } from "react-router-dom";
const Modal = ({ title, children, openTitle, className }) => {
  let navigate = useNavigate();
  return (
    <>
      <label
        htmlFor="my-modal-4"
        className={`btn btn-ghost modal-button ${className}`}
      >
        {title}
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-2xl font-bold">{openTitle}</h3>
          <div className="py-4">{children}</div>
        </label>
      </label>
    </>
  );
};

export default Modal;

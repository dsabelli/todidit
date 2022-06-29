import React from "react";

const Task = (props) => {
  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
        <div>
          <input
            type="checkbox"
            className="checkbox"
            name="checkbox"
            id=""
            checked={props.checked}
            onChange={() => props.onCheck(props.id)}
          />
        </div>
        <div
          className={`flex flex-col items-start ${
            props.checked ? "line-through" : ""
          }`}
        >
          <div className="">{props.title}</div>
          <div className="text-xs mb-5 ">{props.description}</div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="btn"
          onClick={() => {
            props.onUpdate(props.id);
          }}
        >
          edit
        </button>

        <button
          className={`btn btn-square ${
            props.checked ? "" : "btn-disabled opacity-50"
          }`}
          onClick={() => {
            props.onDelete(props.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;

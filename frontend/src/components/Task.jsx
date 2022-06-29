import React from "react";

const Task = (props) => {
  return (
    <div className="flex justify-between px-40">
      <div>
        <div>{props.title}</div>
        <div className="text-xs mb-5">{props.description}</div>
      </div>
      <div className="">
        <button
          onClick={() => {
            props.onUpdate(props.id);
          }}
        >
          edit
        </button>

        <button
          className="btn btn-square"
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

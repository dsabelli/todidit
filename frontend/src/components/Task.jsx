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
      </div>
    </div>
  );
};

export default Task;

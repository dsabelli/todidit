const Didit = (props) => {
  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
        <div
          className={`flex flex-col items-start ${
            props.checked ? "line-through" : ""
          }`}
        >
          <div className="">{props.title}</div>
          <div className="text-xs mb-5 ">{props.description}</div>
          <div className="text-xs mb-5 ">{props.date}</div>
        </div>
      </div>
    </div>
  );
};

export default Didit;

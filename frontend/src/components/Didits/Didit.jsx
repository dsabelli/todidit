const Didit = ({ checked, title, description, date }) => {
  return (
    <div className="flex justify-between px-40 ">
      <div className="flex gap-3 ">
        <div
          className={`flex flex-col items-start ${
            checked ? "line-through" : ""
          }`}
        >
          <div className="">{title}</div>
          <div className="text-xs mb-5 ">{description}</div>
          <div className="text-xs mb-5 ">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Didit;

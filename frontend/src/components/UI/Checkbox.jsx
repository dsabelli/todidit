const Checkbox = ({ checked, id, onChange, name, className }) => {
  return (
    <div className={` ${className}`}>
      <input
        type="Checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
        name={name}
        className={`checkbox checkbox-xs  checkbox-primary  `}
      />
    </div>
  );
};

export default Checkbox;

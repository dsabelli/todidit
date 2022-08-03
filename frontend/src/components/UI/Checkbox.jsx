const Checkbox = ({ checked, id, onChange, name, className, disabled }) => {
  return (
    <div className={` ${className}`}>
      <input
        type="Checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
        name={name}
        className={`checkbox checkbox-xs  checkbox-primary  `}
        disabled={disabled}
      />
    </div>
  );
};

export default Checkbox;

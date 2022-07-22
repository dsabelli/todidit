const Checkbox = ({ checked, id, onChange, name, className }) => {
  return (
    <div className={` ${className}`}>
      <input
        type="Checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
        name={name}
        className={`checkbox  checkbox-primary w-4 h-4 `}
      />
    </div>
  );
};

export default Checkbox;

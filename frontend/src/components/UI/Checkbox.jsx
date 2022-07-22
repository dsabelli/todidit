const Checkbox = ({ checked, id, onChange, name, className }) => {
  return (
    <div>
      <input
        type="Checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
        name={name}
        className={`checkbox  checkbox-primary w-4 h-4 ${className}`}
      />
    </div>
  );
};

export default Checkbox;

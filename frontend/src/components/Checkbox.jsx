const Checkbox = ({ checked, id, onChange, name, className }) => {
  return (
    <input
      type="Checkbox"
      checked={checked}
      id={id}
      onChange={onChange}
      name={name}
      className={`checkbox ${className}`}
    />
  );
};

export default Checkbox;

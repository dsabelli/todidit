const Input = ({
  autoFocus,
  type,
  name,
  id,
  placeholder,
  value,
  className,
  onChange,
  onFocus,
  onKeyDown,
  onBlur,
}) => {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      className={`input ${className}`}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

export default Input;

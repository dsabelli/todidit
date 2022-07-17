const Button = ({ text, onClick, className, type, children }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {text || children}
    </button>
  );
};
export default Button;

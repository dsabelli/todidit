const Button = ({ text, onClick, className, type, children }) => {
  return (
    <button
      type={type}
      className={`btn border-none ${className}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};
export default Button;

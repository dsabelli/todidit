const Button = ({ text, onClick, className, type }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;

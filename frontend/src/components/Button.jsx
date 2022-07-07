const Button = ({ text, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick ? (e) => onClick(e) : () => {}}
    >
      {text}
    </button>
  );
};
export default Button;

const DeleteIcon = ({ className }) => {
  return (
    <div className={`text-base-content ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};
export default DeleteIcon;

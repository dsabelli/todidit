import ErrorIcon from "../../Assets/ErrorIcon";
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="alert alert-error text-sm shadow-lg">
      <div>
        <ErrorIcon className={"w-8"} />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;

import ErrorIcon from "../../Assets/Icons/ErrorIcon";
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="alert alert-error text-sm shadow-lg font-bold py-3 md:py-4 mt-0.5">
      <div>
        <ErrorIcon className={"w-6"} />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;

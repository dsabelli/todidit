import ErrorMessage from "./ErrorMessage";

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <ErrorMessage errorMessage={error.message} />
    </div>
  );
};

export default ErrorFallback;

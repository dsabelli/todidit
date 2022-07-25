import ErrorMessage from "./ErrorMessage";
import Error from "../../pages/Unprotected/Error";
const ErrorFallback = ({ error }) => {
  return (
    <>
      <Error error={error} />
      {/* <ErrorMessage errorMessage={error.message} /> */}
    </>
  );
};

export default ErrorFallback;

import ErrorSvg from "./svg/ErrorSvg";

const FormError = ({ errorMessage }) => {
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <ErrorSvg />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormError;

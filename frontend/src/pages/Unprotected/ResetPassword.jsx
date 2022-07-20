import { useState, useEffect } from "react";
import userService from "../../services/users";
import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { ClockLoader } from "react-spinners";

const ResetPassword = () => {
  // let navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const [reset, setReset] = useState(false);
  const [asyncError, setAsyncError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email }) => handleReset({ email });

  //function for handling user login
  const handleReset = async ({ email }) => {
    setLoaded(false);
    try {
      await userService.resetPassword({ email });
      setLoaded(true);
      setReset(true);
    } catch (error) {
      setLoaded(true);
      console.log(error);
      let errorMsg = error.response.data.error || error;
      setAsyncError(errorMsg);
      setTimeout(() => {
        setAsyncError(null);
      }, 5000);
    }
  };

  // useEffect(() => {
  //   reset &&
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 5000);
  // }, [reset]);

  return loaded ? (
    reset ? (
      <div>pw reset, check email</div>
    ) : (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Reset Password</h1>
            <p className="py-6">
              Enter your user account's verified email address and we will send
              you a password reset link.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  {asyncError && <ErrorMessage errorMessage={asyncError} />}
                  <input
                    autoFocus
                    required
                    type="text"
                    name="email"
                    placeholder="enter your email"
                    className="input input-bordered"
                    {...register("email")}
                  />
                </div>

                <div className="form-control mt-6">
                  <Button
                    type="submit"
                    text={"Reset"}
                    className={"btn-primary"}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  ) : (
    <ClockLoader />
  );
};

export default ResetPassword;

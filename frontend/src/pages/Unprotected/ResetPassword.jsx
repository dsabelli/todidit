import { useState, useEffect } from "react";
import userService from "../../services/users";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import ErrorMessage from "../../components/UI/ErrorMessage";
import ForgotPWSvg from "../../Assets/SVGs/ForgotPWSvg";
import Loader from "../../components/UI/Loader";
import Hero from "../../components/UI/Hero";
import AlternateEmailSvg from "../../Assets/SVGs/AlternateEmailSvg";
import Footer from "../../components/UI/Footer";
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
      <>
        <Hero
          className="gap-16"
          text={
            <div className="flex flex-col">
              <div>
                <h1 className="text-5xl font-bold">Password Reset</h1>
                <p className="pt-6 md:text-xl">
                  Please check your email for a verification
                </p>
                <p className="pb-1 md:text-xl">link to reset your password.</p>
                <p className="text-xs md:text-sm opacity-70 mb-4">
                  Don't forget to check your spam folder!
                </p>
                <Link to="/">
                  <Button className={"text-neutral btn-wide bg-secondary"}>
                    Got it.
                  </Button>
                </Link>
              </div>
            </div>
          }
        >
          <AlternateEmailSvg className={"hidden md:block w-56"} />
        </Hero>
        <Footer />
      </>
    ) : (
      <>
        <div className="md:hero min-h-screen">
          <div className="hero-content flex-col-reverse md:flex-row gap-20 items-center">
            <div className="flex">
              <ForgotPWSvg className={" hidden md:block w-96 my-auto mt-10 "} />
            </div>
            <div>
              <h1 className="text-5xl font-bold pb-2">Reset Password</h1>
              <p className="pt-4">
                Enter the email address associated with your account
              </p>
              <p className="pb-4">
                and we will send you a password reset link.
              </p>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
        </div>
        <Footer />
      </>
    )
  ) : (
    <Loader />
  );
};

export default ResetPassword;

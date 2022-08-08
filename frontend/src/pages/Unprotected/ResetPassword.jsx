import { useState } from "react";
import userService from "../../services/users";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import ErrorMessage from "../../components/UI/ErrorMessage";
import ForgotPWSvg from "../../Assets/SVGs/ForgotPWSvg";
import Hero from "../../components/UI/Hero";
import AlternateEmailSvg from "../../Assets/SVGs/AlternateEmailSvg";
import Footer from "../../components/UI/Footer";

const ResetPassword = () => {
  const [loaded, setLoaded] = useState(true);
  const [reset, setReset] = useState(false);
  const [asyncError, setAsyncError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email }) => handleReset({ email });

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

  return reset && loaded ? (
    <>
      <Hero
        className="gap-16"
        text={
          <div className="flex flex-col">
            <div className="w-full max-w-sm px-4">
              <h1 className="text-5xl font-bold">Password Reset</h1>
              <p className="pt-6 pb-1 md:text-xl">
                Please check your email for a verification link to reset your
                password.
              </p>
              <p className="text-xs md:text-sm opacity-70 mb-4">
                Don't forget to check your spam folder!
              </p>
              <Link to="/">
                <Button
                  className={
                    "text-secondary-content btn-wide bg-secondary hover:bg-secondary-focus"
                  }
                >
                  Got it.
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <AlternateEmailSvg className={"w-full max-w-sm md:max-w-md pl-4"} />
      </Hero>
      <Footer />
    </>
  ) : (
    <>
      <div className="md:hero min-h-screen">
        <div className="hero-content w-full flex-col md:flex-row-reverse gap-20 items-center ">
          <div className="w-full max-w-sm px-4">
            <h1 className="text-5xl font-bold pb-2">Reset Password</h1>
            <p className="py-4 md:text-lg">
              Enter the email address associated with your account and we will
              send you a password reset link.
            </p>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    {asyncError && <ErrorMessage errorMessage={asyncError} />}
                    <input
                      autoFocus
                      required
                      type="email"
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
                      className={`btn-primary ${loaded ? "" : "loading"}`}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ForgotPWSvg className="w-full max-w-sm md:max-w-lg" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;

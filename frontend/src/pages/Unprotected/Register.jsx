import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registrationService from "../../services/register";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import RegisterSvg from "../../Assets/RegisterSvg";
import EmailSvg from "../../Assets/EmailSvg";
const schema = yup.object().shape({
  username: yup
    .string()
    .min(4)
    .max(18)
    .trim()
    .matches(/^[A-Za-z0-9]+$/i, {
      message: "Must not use special characters",
      excludeEmptyString: true,
    })
    .required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/, {
      message:
        "Must include 8-16 characters with a mix of letters, numbers & symbols.",
    })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

const Register = ({}) => {
  let navigate = useNavigate();
  const [registered, setRegistered] = useState(true);
  const [asyncError, setAsyncError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = ({ username, email, password, confirmPassword }) =>
    handleRegistration({ username, email, password, confirmPassword });

  const handleRegistration = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    try {
      await registrationService.register({
        email,
        username,
        password,
        confirmPassword,
      });
      setRegistered(true);
      setAsyncError("");
    } catch (error) {
      console.log(error);
      const errorMsg = error.response ? error.response.data.error : error;
      setAsyncError(errorMsg);
      setTimeout(() => {
        setAsyncError(null);
      }, 5000);
    }
  };

  // useEffect(() => {
  //   registered &&
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 5000);
  // }, [registered]);

  return !registered ? (
    <>
      <UNavbar />
      <div className="hero md:min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse gap-12">
          <div className="text-center md:text-left gap-32 flex flex-col justify-between">
            <RegisterSvg className={"hidden md:block w-72"} />
          </div>
          <div className="">
            <h1 className="text-5xl font-bold pb-4">Register now!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label htmlFor="email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      autoFocus
                      type="text"
                      name="email"
                      {...register("email")}
                      placeholder="email"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <ErrorMessage errorMessage={errors.email?.message} />
                    )}
                    {asyncError && <ErrorMessage errorMessage={asyncError} />}
                  </div>
                  <div className="form-control">
                    <label htmlFor="username" className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="username"
                      {...register("username")}
                      placeholder="username"
                      className="input input-bordered"
                    />
                    {errors.username && (
                      <ErrorMessage errorMessage={errors.username?.message} />
                    )}
                  </div>
                  <div className="form-control">
                    <label htmlFor="password" className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      placeholder="password"
                      className="input input-bordered"
                    />
                    {errors.password && (
                      <ErrorMessage errorMessage={errors.password?.message} />
                    )}
                  </div>
                  <div className="form-control">
                    <label htmlFor="confirmPassword" className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      {...register("confirmPassword")}
                      placeholder="confirm password"
                      className="input input-bordered"
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage
                        errorMessage={errors.confirmPassword?.message}
                      />
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <Button
                      text={"Register"}
                      type="submit"
                      className={"btn-primary"}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <UNavbar isLanding />
      <Hero
        text={
          <>
            <h1 className="text-5xl font-bold">Thank you for registering!</h1>
            <p className="pt-6 md:text-xl">
              Please check your email for a verification
            </p>
            <p className="pb-6 md:text-xl">link to confirm your account.</p>
          </>
        }
      >
        <EmailSvg className={"hidden md:block w-56"} />
      </Hero>
    </>
  );
};

export default Register;

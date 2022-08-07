import { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registrationService from "../../services/register";
import loginService from "../../services/login";
import taskService from "../../services/tasks";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import RegisterSvg from "../../Assets/SVGs/RegisterSvg";
import EmailSvg from "../../Assets/SVGs/EmailSvg";
import Footer from "../../components/UI/Footer";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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
  // const captcha_API = import.meta.env.VITE_HCAPTCHA_SITE_API_KEY;

  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [asyncError, setAsyncError] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  // const [captchaToken, setCaptchaToken] = useState(null);
  // const captchaRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = ({ username, email, password, confirmPassword }) =>
    // captchaRef.current.execute(),
    handleRegistration({ username, email, password, confirmPassword });

  const handleRegistration = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    setLoaded(false);
    try {
      await registrationService.register({
        email,
        username,
        password,
        confirmPassword,
      });
      setRegisteredEmail(email);
      setRegisteredPassword(password);
      setLoaded(true);
      setRegistered(true);
      setAsyncError("");
    } catch (error) {
      setLoaded(true);
      console.log(error);
      const errorMsg = error.response ? error.response.data.error : error;
      setAsyncError(errorMsg);
      setTimeout(() => {
        setAsyncError(null);
      }, 5000);
    }
    // captchaRef.current.resetCaptcha();
    // if (captchaToken) {

    // }
    // setLoaded(true);
    // setAsyncError("Please complete the captcha challenge");
    // setTimeout(() => {
    //   setAsyncError(null);
    // }, 5000);
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await loginService.login({ email, password });
      window.localStorage.setItem("loggedIn", JSON.stringify(user));
      taskService.setToken(user.token);
      setUser(user);
      setRegisteredEmail("");
      setRegisteredPassword("");
      navigate("/app/today");
    } catch (error) {
      console.log(error);
      let errorMsg = error.response.data.error || error;
      setAsyncError(errorMsg);
      setTimeout(() => {
        setAsyncError(null);
      }, 5000);
    }
  };

  return (
    <>
      <UNavbar />
      {registered && loaded ? (
        <Hero
          className="gap-16"
          text={
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Thank you for registering!
                </h1>
                <p className="pt-6 md:text-xl">
                  Please check your email for a verification
                </p>
                <p className="pb-1 md:text-xl">link to confirm your account.</p>
                <p className="text-xs md:text-sm opacity-70">
                  Don't forget to check your spam folder!
                </p>
              </div>
              <div className="max-w-sm flex flex-col pr-8 ">
                <h2 className="text-lg md:text-2xl mb-4">
                  We've logged you in just this time.
                </h2>
                <Button
                  onClick={() =>
                    handleLogin({
                      email: registeredEmail,
                      password: registeredPassword,
                    })
                  }
                  className={
                    "text-secondary-content bg-secondary hover:bg-secondary-focus "
                  }
                >
                  Let's Go!
                </Button>
              </div>
            </div>
          }
        >
          <EmailSvg className={"hidden md:block w-56"} />
        </Hero>
      ) : (
        <div className="md:hero min-h-screen bg-base-100">
          <div className="hero-content flex-col md:flex-row-reverse gap-20 items-center ">
            <RegisterSvg className={"hidden lg:block w-96"} />
            <div className="">
              <h1 className="text-5xl font-bold pb-4">Register now!</h1>
              {asyncError && <ErrorMessage errorMessage={asyncError} />}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div className="card-body">
                    <div className="form-control">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-lg">Email</span>
                      </label>
                      <input
                        autoFocus
                        type="text"
                        name="email"
                        {...register("email")}
                        placeholder="email"
                        className="input input-bordered focus:outline-none"
                      />
                      {errors.email && (
                        <ErrorMessage errorMessage={errors.email?.message} />
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="username" className="label">
                        <span className="label-text text-lg">Username</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="username"
                        {...register("username")}
                        placeholder="username"
                        className="input input-bordered focus:outline-none"
                      />
                      {errors.username && (
                        <ErrorMessage errorMessage={errors.username?.message} />
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="password" className="label">
                        <span className="label-text text-lg">Password</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        {...register("password")}
                        placeholder="password"
                        className="input input-bordered focus:outline-none"
                      />
                      {errors.password && (
                        <ErrorMessage errorMessage={errors.password?.message} />
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="confirmPassword " className="label">
                        <span className="label-text text-lg">
                          Confirm Password
                        </span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword")}
                        placeholder="confirm password"
                        className="input input-bordered focus:outline-none"
                      />
                      {errors.confirmPassword && (
                        <ErrorMessage
                          errorMessage={errors.confirmPassword?.message}
                        />
                      )}
                    </div>
                    <div className="form-control mt-6">
                      {/* <div className="mb-4">
                        <HCaptcha
                          sitekey={captcha_API}
                          onVerify={setCaptchaToken}
                          ref={captchaRef}
                        />
                      </div> */}
                      <Button
                        text={"Register"}
                        type="submit"
                        className={`btn-primary ${loaded ? "" : "loading"}`}
                      />
                      <p className="mt-2 text-2xs opacity-60">
                        By continuing, you agree to toDidit's{" "}
                        {
                          <Link className="link" to={"/privacy"}>
                            Privacy Policy
                          </Link>
                        }{" "}
                        and{" "}
                        {
                          <Link className="link" to={"/terms-of-service"}>
                            Terms of Service
                          </Link>
                        }
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Register;

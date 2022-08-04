import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/users";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Button from "../../components/UI/Button";
import { useNavigate, useParams, Link } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import ConfirmPWSvg from "../../Assets/SVGs/ConfirmPWSvg";
import ConfirmResetSvg from "../../Assets/SVGs/ConfirmResetSvg";
import Loader from "../../components/UI/Loader";
import Footer from "../../components/UI/Footer";
const schema = yup.object().shape({
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

const ConfirmReset = ({}) => {
  let navigate = useNavigate();
  let params = useParams();
  const [loaded, setLoaded] = useState(true);
  const [reset, setReset] = useState(false);
  const [asyncError, setAsyncError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = ({ password, confirmPassword }) =>
    handleConfirmReset({ password, confirmPassword });

  const handleConfirmReset = async ({ password, confirmPassword }) => {
    setLoaded(false);
    try {
      await userService.confirmReset(
        {
          password,
          confirmPassword,
        },
        params.token
      );
      setLoaded(true);
      setReset(true);
      setAsyncError("");
    } catch (error) {
      setLoaded(true);
      console.log(error);
      const errorMsg = error.response ? error.response.data.error : error;
      setAsyncError(errorMsg);
    }
  };

  //take user to the login screen after password is reset
  useEffect(() => {
    reset &&
      setTimeout(() => {
        setLoaded(false);
      }, 3000);
    reset &&
      setTimeout(() => {
        navigate("/login");
      }, 3000);
  }, [reset]);

  return loaded ? (
    reset ? (
      <>
        <UNavbar isLanding />
        <Hero
          className={"gap-20 items-stretch"}
          text={
            <>
              <h1 className="text-4xl font-bold ">
                Password reset
                <br /> confirmed!
              </h1>
              <p className="mt-4 text-lg">Taking you to the login page...</p>
            </>
          }
        >
          <ConfirmResetSvg className="hidden md:block w-64" />
        </Hero>
      </>
    ) : (
      <>
        <UNavbar />
        <div className="md:hero min-h-screen">
          <div className="hero-content flex-col md:flex-row-reverse gap-20">
            <div className="text-center md:text-left">
              <ConfirmPWSvg className={"hidden md:block w-80 mb-20"} />
            </div>
            <div className="mb-40">
              <h1 className="text-5xl font-bold pb-4">
                Confirm New
                <br /> Password
              </h1>
              {asyncError && (
                <p className="text-xs pb-2">
                  {asyncError}{" "}
                  <Link className="link" to="/reset-password">
                    Request a new one?
                  </Link>
                </p>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div className="card-body">
                    <div className="form-control">
                      <input
                        type="password"
                        name="password"
                        {...register("password")}
                        placeholder="new password"
                        className="input input-bordered focus:outline-none"
                      />
                      {errors.password && (
                        <ErrorMessage errorMessage={errors.password?.message} />
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword")}
                        placeholder="new confirm password"
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
                        text={"Confirm"}
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
        <Footer />
      </>
    )
  ) : (
    <Loader />
  );
};

export default ConfirmReset;

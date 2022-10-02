import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/users";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Button from "../../components/UI/Button";
import { useParams, Link } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import ConfirmPWSvg from "../../Assets/SVGs/ConfirmPWSvg";
import ConfirmResetSvg from "../../Assets/SVGs/ConfirmResetSvg";
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

  return reset && loaded ? (
    <>
      <UNavbar isLanding />
      <Hero
        className="items-stretch"
        text={
          <div className="w-full max-w-sm px-4">
            <h1 className="text-4xl md:text-5xl font-bold ">
              Password reset confirmed!
            </h1>
            <div className="flex w-full justify-start mt-12">
              <Link to="/login">
                <Button className="md:btn-wide mb-4 md:mb-0 md:text-lg btn-secondary">
                  Go to login
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <ConfirmResetSvg className="w-full max-w-xs md:max-w-lg pl-4" />
      </Hero>
    </>
  ) : (
    <>
      <UNavbar />
      <div className="md:hero min-h-screen">
        <div className="hero-content flex-col md:flex-row">
          <div className="w-full max-w-sm md:max-w-lg px-4">
            <h1 className="text-4xl md:text-5xl font-bold pb-4">
              Confirm New Password
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
                      className={`btn-primary ${loaded ? "" : "loading"}`}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ConfirmPWSvg className="w-full max-w-xs md:max-w-lg pl-4" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmReset;

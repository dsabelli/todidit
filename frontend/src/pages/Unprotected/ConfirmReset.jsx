import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/users";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Button from "../../components/UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import { ClockLoader } from "react-spinners";
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
      setTimeout(() => {
        setAsyncError(null);
      }, 5000);
    }
  };

  useEffect(() => {
    reset &&
      setTimeout(() => {
        navigate("/login");
      }, 3000);
  }, [reset]);

  return loaded ? (
    reset ? (
      <>
        <UNavbar />
        <div>Password reset confirmed! Taking you to the login page...</div>
      </>
    ) : (
      <>
        <UNavbar />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Confirm New Password</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      placeholder="new password"
                      className="input input-bordered"
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
      </>
    )
  ) : (
    <ClockLoader />
  );
};

export default ConfirmReset;

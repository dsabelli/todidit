import React from "react";
import registrationService from "../services/register";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormError from "./FormError";

const schema = yup.object().shape({
  username: yup
    .string()
    .max(20)
    .matches(/^[A-Za-z0-9]+$/i, {
      message: "Must not use special characters",
      excludeEmptyString: true,
    })
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

const Registerv = ({ setSystemMessage, handleNewUser }) => {
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
    username,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      await registrationService.register({
        username,
        email,
        password,
        confirmPassword,
      });
      handleNewUser();
    } catch (error) {
      console.log(error);
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
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
                  <FormError errorMessage={errors.username?.message} />
                )}
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  {...register("email")}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <FormError errorMessage={errors.email?.message} />
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
                  <FormError errorMessage={errors.password?.message} />
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
                  <FormError errorMessage={errors.confirmPassword?.message} />
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerv;

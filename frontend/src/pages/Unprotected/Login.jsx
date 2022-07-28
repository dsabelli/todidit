import { useState, useContext } from "react";
import loginService from "../../services/login";
import taskService from "../../services/tasks";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { UserContext } from "../../context/UserContext";
import UNavbar from "../../layouts/UNavbar";
import LoginSvg from "../../Assets/SVGs/LoginSvg";
import Footer from "../../components/UI/Footer";
const Login = () => {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [asyncError, setAsyncError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, password }) => handleLogin({ email, password });

  //function for handling user login
  const handleLogin = async ({ email, password }) => {
    try {
      const user = await loginService.login({ email, password });
      window.localStorage.setItem("loggedIn", JSON.stringify(user));
      taskService.setToken(user.token);
      setUser(user);
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse items-center gap-20">
          <LoginSvg className={"hidden md:block w-96"} />
          <div>
            <h1 className="text-5xl font-bold pb-4">Login now!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    {asyncError && <ErrorMessage errorMessage={asyncError} />}
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      autoFocus
                      required
                      type="text"
                      name="email"
                      placeholder="email"
                      className="input input-bordered"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                      {...register("password")}
                    />

                    <label className="label">
                      <Link
                        to="/reset-password"
                        className="label-text-alt link link-hover text-2xs "
                      >
                        Forgot password?
                      </Link>
                    </label>
                  </div>
                  <div className="form-control ">
                    <Button
                      type="submit"
                      text={"Login"}
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
  );
};

export default Login;

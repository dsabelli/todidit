import { useState, useContext } from "react";
import loginService from "../../services/login";
import taskService from "../../services/tasks";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { UserContext } from "../../components/context/UserContext";

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
      navigate("/app/all");
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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
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
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
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
  );
};

export default Login;

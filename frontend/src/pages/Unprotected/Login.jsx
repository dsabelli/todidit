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
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, password }) => handleLogin({ email, password });

  //function for handling user login
  const handleLogin = async ({ email, password }) => {
    setLoaded(false);
    try {
      const user = await loginService.login({ email, password });
      if (user) {
        setLoaded(true);
        window.localStorage.setItem("loggedIn", JSON.stringify(user));
        taskService.setToken(user.token);
        setUser(user);
        navigate("/app/today");
      }
    } catch (error) {
      setLoaded(true);
      console.log(error);
      let errorMsg = error.response.data.error || error;
      setErrorMessage(errorMsg);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <UNavbar />
      <div className="md:hero min-h-screen bg-base-100">
        <div className="hero-content w-full flex-col md:flex-row md:justify-center items-center md:gap-20">
          <div className="w-full max-w-sm px-4">
            <h1 className="text-5xl font-bold pb-4">Login now!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    {errorMessage && (
                      <ErrorMessage errorMessage={errorMessage} />
                    )}
                    <label className="label">
                      <span className="label-text text-lg">Email</span>
                    </label>
                    <input
                      autoFocus
                      required
                      type="text"
                      name="email"
                      placeholder="email"
                      className="input input-bordered focus:outline-none"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Password</span>
                    </label>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered focus:outline-none"
                      {...register("password")}
                    />

                    <label className="label">
                      <Link
                        to="/reset-password"
                        className="label-text-alt link link-hover text-2xs"
                      >
                        Forgot password?
                      </Link>
                    </label>
                  </div>
                  <div className="form-control ">
                    <Button
                      type="submit"
                      text={"Login"}
                      className={`btn-primary ${loaded ? "" : "loading"}`}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <LoginSvg className={"w-full max-w-sm md:max-w-lg mt-12"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

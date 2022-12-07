import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import Button from "../components/UI/Button";
import ToDidit from "../components/UI/ToDidit";
import loginService from "../services/login";
import taskService from "../services/tasks";
import { UserContext } from "../context/UserContext";
import emailjs from "@emailjs/browser";

const UNavbar = ({ isLanding, username }) => {
  let navigate = useNavigate();
  const form = useRef();
  const login_email = import.meta.env.VITE_LOGIN_EMAIL;
  const login_password = import.meta.env.VITE_LOGIN_PASSWORD;
  const emailJs_API = import.meta.env.VITE_EMAIL_JS_SITE_API_KEY;
  const { setUser } = useContext(UserContext);

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await loginService.login({
        email,
        password,
      });
      window.sessionStorage.setItem("loggedIn", JSON.stringify(user));
      taskService.setToken(user.token);
      setUser(user);
      navigate("/app/today");
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_mmlaf1r",
        "template_79xcu8k",
        form.current,
        emailJs_API
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar bg-neutral flex px-4 pl-0 md:pl-4 justify-between h-16 gap-4">
      <ToDidit className="pb-2" todiditClass="text-neutral-content" />
      <div className={`flex gap-4 ${isLanding ? "" : "hidden"} `}>
        <form ref={form} onSubmit={(e) => sendEmail(e)}>
          <Button
            text={"try out test account"}
            className="bg-secondary text-secondary-content hover:bg-secondary-focus "
            onClick={() =>
              handleLogin({ email: login_email, password: login_password })
            }
          />
        </form>
        <Link to="/login">
          <Button
            text={"Login"}
            className="bg-neutral-content text-neutral-focus hover:bg-neutral-content"
          />
        </Link>
      </div>
      {username && (
        <div className="dropdown dropdown-end p-1">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={`https://avatars.dicebear.com/api/initials/${username[0]}.svg`}
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <UserDropdown />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UNavbar;

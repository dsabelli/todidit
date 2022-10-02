import { useState, useEffect, useContext, useRef } from "react";
import ContactSvg from "../../Assets/SVGs/ContactSvg";
import UNavbar from "../../layouts/UNavbar";
import { UserContext } from "../../context/UserContext";
import taskService from "../../services/tasks";
import Footer from "../../components/UI/Footer";
import Button from "../../components/UI/Button";
import emailjs from "@emailjs/browser";
import EmailSvg from "../../Assets/SVGs/EmailSvg";
import Hero from "../../components/UI/Hero";
import { Link } from "react-router-dom";
import Error from "./Error";

const Contact = () => {
  const emailJs_API = import.meta.env.VITE_EMAIL_JS_SITE_API_KEY;

  const { user, setUser } = useContext(UserContext);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const form = useRef();

  //function to send the form info to support@todidit.com
  const sendEmail = async (e) => {
    setLoaded(false);
    e.preventDefault();
    try {
      const response = await emailjs.sendForm(
        "service_mmlaf1r",
        "template_79xcu8k",
        form.current,
        emailJs_API
      );
      if (response) setLoaded(true), setEmailSent(true);
    } catch (error) {
      setLoaded(true);
      setEmailError(true);
      console.log(error);
    }
  };

  //if user is accessing contact form while logged in, get token from localStorage
  useEffect(() => {
    let loggedIn = null;
    if (window.localStorage.getItem("loggedIn"))
      loggedIn = window.localStorage.getItem("loggedIn");
    else if (window.sessionStorage.getItem("loggedIn"))
      loggedIn = window.sessionStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <>
      {user ? <UNavbar username={user.username} /> : <UNavbar />}
      {emailSent && loaded ? (
        <Hero
          text={
            <div className="w-full max-w-sm px-4">
              <h1 className="text-5xl font-bold">Email Received!</h1>
              <p className="pt-6 md:text-xl">Thank you for getting in touch.</p>
              <p className="pb-6 md:text-xl">
                Our support team will reach out as soon as possible.
              </p>

              <Link to="/app/today">
                <Button
                  className={
                    "text-secondary-content bg-secondary hover:bg-secondary-focus"
                  }
                >
                  Back Home
                </Button>
              </Link>
            </div>
          }
        >
          <EmailSvg className="w-full max-w-xs px-12 md:p-10" />
        </Hero>
      ) : emailError ? (
        <Error />
      ) : (
        <div className="md:hero min-h-screen bg-base-100">
          <div className="hero-content w-full flex-col md:flex-row items-center">
            <div className="w-full max-w-sm px-4">
              <h1 className="text-4xl md:text-5xl font-bold pb-4">
                Get in touch
              </h1>
              <form ref={form} onSubmit={sendEmail}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Email</span>
                      </label>
                      <input
                        autoFocus
                        required
                        type="email"
                        name="email"
                        placeholder="your email address"
                        className="input input-bordered focus:outline-none px-2"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Subject</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="subject"
                        placeholder="subject"
                        className="input input-bordered focus:outline-none px-2"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Description</span>
                      </label>
                      <textarea
                        required
                        type="text"
                        name="description"
                        placeholder="description"
                        className="textarea input-bordered resize-none w-full p-4 h-20 md:h-32 border leading-4 focus:outline-none px-2"
                      ></textarea>
                    </div>

                    <div className="form-control ">
                      <Button
                        type="submit"
                        text="Submit"
                        className={`btn-primary ${loaded ? "" : "loading"}`}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <ContactSvg className="w-full max-w-xs md:max-w-lg pl-4" />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Contact;

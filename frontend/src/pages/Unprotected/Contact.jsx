import { useEffect, useContext } from "react";
import ContactSvg from "../../Assets/SVGs/ContactSvg";
import UNavbar from "../../layouts/UNavbar";
import { UserContext } from "../../context/UserContext";
import taskService from "../../services/tasks";

const Contact = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
      // setLoaded(true);
      // setTimeout(() => {
      //   setLoaded(true);
      // }, 400);
    }
  }, []);
  return (
    <div>
      {user ? <UNavbar username={user.username} /> : <UNavbar />}
      Contact <ContactSvg className="" />
    </div>
  );
};

export default Contact;

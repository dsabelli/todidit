import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/UI/Button";
import userService from "../../services/users";
import taskService from "../../services/tasks";
import alertService from "../../services/alerts";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Loader from "../../components/UI/Loader";
import ProfileSvg from "../../Assets/SVGs/ProfileSvg";
import GoodbyeSvg from "../../Assets/SVGs/GoodbyeSvg";

const Profile = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [deleted, setDeleted] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };

  const handleDeleteUser = async () => {
    const alert = await alertService.userAlert();
    if (alert.isConfirmed) {
      await userService.deleteUser(user);
      alertService.userSuccess();
      setDeleted(true);
      window.localStorage.removeItem("loggedIn");
      setTimeout(() => {
        handleLogout();
      }, 10000);
    }
  };

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      taskService.setToken(user.token);
      setUser(user);
      // setLoaded(true);
      setTimeout(() => {
        setLoaded(true);
      }, 400);
    }
  }, []);
  return loaded ? (
    !deleted ? (
      <>
        <Navbar />
        <div
          className={
            "flex px-10 mt-6 justify-center md:justify-between h-screen "
          }
        >
          <div className="max-w-md md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold mb-5">Account Profile</h1>
            <p className="text-lg font-bold">Delete Account</p>
            <p className="text-xs ">
              This will immediately delete all of your data, including tasks,
              projects and didits.{" "}
              <span className="font-bold">This cannot be undone.</span>
            </p>
            <div className=" flex gap-2 mt-4">
              <Button
                className="btn-error"
                text="Delete Account"
                onClick={() => handleDeleteUser()}
              />
            </div>
          </div>
          <ProfileSvg className={" mx-auto mt-16 w-2/5 hidden md:block"} />
        </div>
      </>
    ) : (
      <div className="p-8 h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-6xl">Sorry to see you go.</h1>
          <p className="text-2xl">
            You are always welcome to join toDidit again!
          </p>
          <GoodbyeSvg className="w-3/4 self-center" />
          <Button className="btn-lg" onClick={() => handleLogout()}>
            Got it
          </Button>
        </div>
      </div>
    )
  ) : (
    <Loader />
  );
};
export default Profile;

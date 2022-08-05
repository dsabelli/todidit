import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/UI/Button";
import userService from "../../services/users";
import taskService from "../../services/tasks";
import UNavbar from "../../layouts/UNavbar";
import Loader from "../../components/UI/Loader";
import ProfileSvg from "../../Assets/SVGs/ProfileSvg";
import GoodbyeSvg from "../../Assets/SVGs/GoodbyeSvg";
import DeleteAlert from "../../layouts/DeleteAlert";
import ErrorIcon from "../../Assets/Icons/ErrorIcon";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeleteUser = async () => {
    await userService.deleteUser(user);
    setDeleted(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
  };

  //check localStorage for token between unnested routes
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
        <UNavbar username={user.username} />
        <div
          className={
            "flex flex-col md:flex-row px-10 mt-6 md:justify-center h-screen "
          }
        >
          <div className="max-w-md md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold mb-5">Account Profile</h1>
            <p className="text-xl font-bold">Delete Account</p>
            <p className="text-sm mt-2">
              This will immediately delete all of your data,
              <br /> including tasks, projects and didits.
            </p>
            <p className="font-bold text-sm">This cannot be undone.</p>

            <div className=" flex gap-2 mt-4">
              <DeleteAlert
                modalId="Profile"
                openButtonClass="btn-error"
                openButton="Delete Account"
                modalTitle="your account"
                modalIcon={<ErrorIcon className="w-24 mx-auto my-8" />}
                onClick={() => handleDeleteUser()}
              />
            </div>
          </div>
          <ProfileSvg className="mt-10 w-64 md:m-0 md:w-96" />
        </div>
      </>
    ) : (
      <div className="p-8 md:p-0">
        <div className="h-screen flex flex-col gap-4 md:justify-center items-center">
          <h1 className="text-5xl md:text-6xl">Sorry to see you go.</h1>
          <p className="text-lg md:text-2xl">
            You are always welcome to join toDidit again!
          </p>
          <GoodbyeSvg className="w-80 md:w-96 my-4" />
          <form onSubmit={() => handleLogout()}>
            <Button className="text-left btn-wide" type="submit">
              Got it
            </Button>
          </form>
        </div>
      </div>
    )
  ) : (
    <Loader />
  );
};
export default Profile;

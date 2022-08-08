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
import Hero from "../../components/UI/Hero";
import ErrorMessage from "../../components/UI/ErrorMessage";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [asyncError, setAsyncError] = useState("");

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(user);
      window.localStorage.removeItem("loggedIn");
      setDeleted(true);
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
            "flex flex-col md:flex-row px-10 mt-6 md:justify-center h-screen"
          }
        >
          <div className="max-w-md md:w-1/2 flex flex-col">
            {asyncError && <ErrorMessage errorMessage={asyncError} />}
            <h1 className="text-4xl font-bold mb-5">Account Profile</h1>
            <p className="text-xl font-bold">Delete Account</p>
            <p className="text-sm pr-4 mt-2">
              This will immediately delete all of your data, including tasks,
              projects, didits and settings.
            </p>
            <p className="font-bold text-sm mt-2">This cannot be undone.</p>

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
          <ProfileSvg className="mt-10 max-w-xs md:max-w-sm md:m-0" />
        </div>
      </>
    ) : (
      <>
        <UNavbar />
        <Hero
          text={
            <div className="w-full max-w-sm px-4">
              <h1 className="text-4xl md:text-5xl font-bold ">
                Sorry to see you go.
              </h1>
              <p className="text-lg md:text-2xl my-6">
                You are always welcome to join toDidit again!
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="md:btn-wide mb-4 md:mb-0 md:text-lg"
                text="Got it"
              />
            </div>
          }
        >
          <GoodbyeSvg className="w-full max-w-xs pl-4 md:max-w-md" />
        </Hero>
      </>
    )
  ) : (
    <Loader />
  );
};
export default Profile;

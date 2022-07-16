import { useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import Button from "../../components/UI/Button";
import userService from "../../services/users";
import alertService from "../../services/alerts";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleLogout = () => {
    navigate("/");
    window.localStorage.clear();
  };
  const handleDeleteUser = async () => {
    const alert = await alertService.userAlert();
    if (alert.isConfirmed) {
      await userService.deleteUser(user);
      alertService.userSuccess();
      setTimeout(() => {
        handleLogout();
      }, 800);
    }
  };
  return (
    <div>
      {
        <Button
          className="btn-error"
          text="Delete Self"
          onClick={() => handleDeleteUser()}
        />
      }
    </div>
  );
};
export default Profile;

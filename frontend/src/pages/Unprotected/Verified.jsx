import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import registerService from "../../services/register";

const Verified = () => {
  let params = useParams();

  const verify = async () => {
    await registerService.verifyEmail(params.token);
  };
  useEffect(() => {
    verify();
  }, []);
  return (
    <>
      <UNavbar />
      <div>
        Verified{" "}
        <Link className="btn" to="/login">
          Please Login
        </Link>
      </div>
    </>
  );
};

export default Verified;

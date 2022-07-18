import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import registerService from "../../services/register";

const Verified = () => {
  let params = useParams();
  console.log(params);
  const verify = async () => {
    await registerService.verifyEmail(params.token);
  };
  useEffect(() => {
    verify();
  }, []);
  return (
    <div>
      Verified <Link to="/login">Please Login</Link>
    </div>
  );
};

export default Verified;

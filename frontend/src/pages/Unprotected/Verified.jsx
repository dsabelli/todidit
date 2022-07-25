import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import Button from "../../components/UI/Button";
import VerifiedSvg from "../../Assets/SVGs/VerifiedSvg";
import registerService from "../../services/register";
import { ClockLoader } from "react-spinners";
const Verified = () => {
  let params = useParams();
  const [loaded, setLoaded] = useState(false);
  const verify = async () => {
    await registerService.verifyEmail(params.token);
  };
  useEffect(() => {
    verify();
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  return loaded ? (
    <>
      <UNavbar isLanding />
      {/* Make into a success message! */}
      <p>Your account has been verified!</p>
      {/* Make into a success message! */}
      <Hero
        text={
          <>
            <h1 className="text-5xl font-bold mb-12">
              Welcome to <span className="text-primary">toDidit!</span>
            </h1>

            <Link to="/login">
              <Button className="btn-secondary">Login now!</Button>
            </Link>
          </>
        }
      >
        <VerifiedSvg className={"pr-10 w-72"} />
      </Hero>
    </>
  ) : (
    <ClockLoader />
  );
};

export default Verified;

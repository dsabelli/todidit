import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import Button from "../../components/UI/Button";
import VerifiedSvg from "../../Assets/SVGs/VerifiedSvg";
import registerService from "../../services/register";

import Loader from "../../components/UI/Loader";
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
      <UNavbar />
      <Hero
        text={
          <>
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-primary">toDidit!</span>
            </h1>
            <p className="md:text-center mb-8">
              Your account has successfully been verified.
            </p>
            <div className="flex w-full justify-center">
              <Link to="/login">
                <Button className="md:btn-wide btn-secondary">
                  Login now!
                </Button>
              </Link>
            </div>
          </>
        }
      >
        <VerifiedSvg className={"pr-10 w-72"} />
      </Hero>
    </>
  ) : (
    <Loader />
  );
};

export default Verified;

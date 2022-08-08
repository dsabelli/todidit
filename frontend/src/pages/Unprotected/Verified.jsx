import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Hero from "../../components/UI/Hero";
import Button from "../../components/UI/Button";
import VerifiedSvg from "../../Assets/SVGs/VerifiedSvg";
import registerService from "../../services/register";
import Loader from "../../components/UI/Loader";
import Footer from "../../components/UI/Footer";

const Verified = () => {
  let params = useParams();
  const [loaded, setLoaded] = useState(false);

  const verify = async () => {
    try {
      await registerService.verifyEmail(params.token);
    } catch (error) {
      setLoaded(true);
      console.log(error);
      const errorMsg = error.response ? error.response.data.error : error;
    }
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-6xl md:text-7xl block mt-2 text-primary">
                toDidit!
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Your account has successfully <br /> been verified.
            </p>
            <div className="flex w-full justify-start">
              <Link to="/login">
                <Button className="md:btn-wide mb-4 md:mb-0 md:text-lg btn-secondary">
                  Login now!
                </Button>
              </Link>
            </div>
          </>
        }
      >
        <VerifiedSvg className={"w-full md:w-1/2 max-w-xs pr-10"} />
      </Hero>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Verified;

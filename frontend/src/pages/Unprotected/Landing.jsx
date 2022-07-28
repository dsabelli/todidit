import { Link } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Button from "../../components/UI/Button";
import Hero from "../../components/UI/Hero";
import HeroSvg from "../../Assets/SVGs/HeroSvg";
import Footer from "../../components/UI/Footer";
const Landing = () => {
  return (
    <>
      <UNavbar isLanding />
      <div className="">
        <Hero
          className="bg-base-100 h-screen"
          text={
            <div className="flex flex-col items-center text-left">
              <div className="w/1-2">
                <h1 className="text-6xl md:text-8xl font-bold">toDidit</h1>
                <p className="text-lg md:text-2xl pt-6 ">
                  Keep track of what you need to do,
                </p>
                <p className="text-lg md:text-2xl pb-6 ">
                  and what you've already done.
                </p>
                <Link to="/register">
                  <Button
                    className=" md:btn-lg btn-primary  hover:bg-secondary"
                    text={"Get Started"}
                  />
                </Link>
              </div>
            </div>
          }
        >
          <HeroSvg className={" w-80 mt-12 md:mt-0 md:w-1/2"} />
        </Hero>
      </div>
      <Footer />
    </>
  );
};

export default Landing;

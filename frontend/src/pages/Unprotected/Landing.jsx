import { Link } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Button from "../../components/UI/Button";
import Hero from "../../components/UI/Hero";
import HeroSvg from "../../Assets/SVGs/HeroSvg";
const Landing = () => {
  return (
    <>
      <UNavbar isLanding />
      <div className="h-screen">
        <Hero
          text={
            <div className="flex flex-col items-center text-left">
              <div className="w/1-2">
                <h1 className="text-8xl font-bold">toDidit</h1>
                <p className="text-2xl pt-6 ">
                  Keep track of what you need to do,
                </p>
                <p className="text-2xl pb-6 ">and what you've already done.</p>
                <Link to="/register">
                  <Button className="btn-lg btn-primary" text={"Get Started"} />
                </Link>
              </div>
            </div>
          }
        >
          <HeroSvg className={"w-1/2"} />
        </Hero>
      </div>
    </>
  );
};

export default Landing;

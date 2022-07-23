import { Link } from "react-router-dom";
import UNavbar from "../../layouts/UNavbar";
import Button from "../../components/UI/Button";
import Hero from "../../components/UI/Hero";
import HeroSvg from "../../Assets/HeroSvg";
// import { ReactComponent as HeroSv } from "../../Assets/Hero.svg";
const Landing = () => {
  return (
    <div>
      <UNavbar isLanding />
      <Hero
        text={
          <>
            <h1 className="text-6xl font-bold">toDidit</h1>
            <p className="pt-6 ">Keep track of what you need to do,</p>
            <p className="pb-6 ">and what you've already done.</p>
            <Link to="/register">
              <Button className="btn btn-primary" text={"Get Started"} />
            </Link>
          </>
        }
      >
        <HeroSvg className={" w-96"} />
        {/* <div className="w-96 flex">
          <HeroSv />
        </div> */}
      </Hero>
    </div>
  );
};

export default Landing;

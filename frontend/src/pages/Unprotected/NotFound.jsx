import React from "react";
import Hero from "../../components/UI/Hero";
import NotFoundSvg from "../../Assets/SVGs/NotFoundSvg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div role="alert" className="h-screen">
      <Hero
        className="w-screen"
        text={
          <div className=" px-20 md:ml-20 md:p-0">
            <h1 className="text-6xl font-bold mb-12 ">404</h1>

            <h2 className="text-4xl  font-bold">Uh oh!</h2>
            <p className="my-6 text-xl ">
              Sorry. The page you are looking for does not exist.
            </p>
            <Button onClick={() => navigate(-1)} className="btn-wide">
              Go back.
            </Button>
          </div>
        }
      >
        <NotFoundSvg className={"hidden md:block w-1/3 md:w-1/2"} />
      </Hero>
    </div>
  );
};

export default NotFound;

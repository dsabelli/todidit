import React from "react";
import Hero from "../../components/UI/Hero";
import ErrorSvg from "../../Assets/SVGs/ErrorSvg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
const Error = ({ error }) => {
  let navigate = useNavigate();
  console.log(error);
  return (
    <div role="alert" className="h-screen">
      <Hero
        className="w-screen"
        text={
          <div className=" px-20 md:ml-20 md:p-0">
            <h1 className="text-5xl font-bold">Uh oh!</h1>
            <p className="mt-6 text-xl">Something went wrong.</p>
            <p className="mb-10 text-xl">
              Please{" "}
              <a
                onClick={() => (navigate("/contact"), window.location.reload())}
                className="link hover:text-info"
              >
                contact us
              </a>{" "}
              or try again later.
            </p>
            <Button
              onClick={() => (navigate("/app/today"), window.location.reload())}
              className="btn-wide"
            >
              Go back.
            </Button>
          </div>
        }
      >
        <ErrorSvg
          className={
            "w-full md:w-1/2 max-w-xs md:max-w-md mt-12 md:mt-0 text-error"
          }
        />
      </Hero>
    </div>
  );
};

export default Error;

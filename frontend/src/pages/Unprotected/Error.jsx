import React from "react";
import Hero from "../../components/UI/Hero";
import ErrorSvg from "../../Assets/SVGs/ErrorSvg";
const Error = ({ error }) => {
  return (
    <div role="alert">
      <Hero
        className="w-screen"
        text={
          <div className=" px-20 md:ml-20 md:p-0">
            <h1 className="text-3xl font-bold">{error.message || "Uh oh!"}</h1>
            {!error && <p className="pt-6 ">Something went wrong.</p>}
            {!error && (
              <p className="pb-6 ">Please go back or try again later.</p>
            )}
          </div>
        }
      >
        <ErrorSvg className={"text-error w-1/3 md:w-1/2"} />
      </Hero>
    </div>
  );
};

export default Error;

import React from "react";
import Hero from "../../components/UI/Hero";
import ErrorSvg from "../../Assets/ErrorSvg";
const Error = ({ error }) => {
  return (
    <div role="alert">
      <Hero
        className={"w-screen"}
        text={
          <div className=" px-20 md:ml-20 md:p-0">
            <h1 className="text-6xl font-bold">{error.message || "Oh NO!"}</h1>
            <p className="pt-6 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              ipsum nisi provident maxime rem illum voluptas beatae, blanditiis
              dolorem?
            </p>
            <p className="pb-6 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              iusto. Ducimus velit laboriosam molestiae?
            </p>
          </div>
        }
      >
        <ErrorSvg className={"text-error w-1/3 md:w-1/2"} />
      </Hero>
    </div>
  );
};

export default Error;

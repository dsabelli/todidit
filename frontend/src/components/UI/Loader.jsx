import { ClockLoader } from "react-spinners";
import React from "react";

const Loader = ({ size, color }) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {" "}
      <ClockLoader size={size || 70} color={color} />
    </div>
  );
};

export default Loader;

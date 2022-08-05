import React from "react";

const TimeMachineIcon = ({ className }) => {
  return (
    <div className={`text-base-content ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 69">
        <path
          dataname="layer2"
          d="M10.166 34.947A26.562 26.562 0 0 1 10 31.984 26 26 0 1 1 36 58"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="5"
        ></path>
        <path
          dataname="layer2"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="5"
          d="M2 22.966l8.166 11.981L21 24.966"
        ></path>
        <path
          dataname="layer1"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="5"
          d="M34.992 17v18h12"
        ></path>
      </svg>
    </div>
  );
};

export default TimeMachineIcon;

import React from "react";

const EditIcon = ({ className }) => {
  return (
    <div className={` ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="currentColor"
        stroke="currentColor"
      >
        <title>Edit</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer1"
          fill="currentColor"
          stroke="#202020"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M56 2.4l-26.1 26-4 9.7 9.7-4.1 26-26L56 2.4z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
        <path
          data-name="layer2"
          fill="currentColor"
          stroke="#202020"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M34.4 11.6h-32v50h50v-32"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
        <path
          data-name="layer1"
          fill="currentColor"
          stroke="#202020"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M50.8 7.6l5.6 5.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export default EditIcon;

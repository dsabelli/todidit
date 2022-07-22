import React from "react";

const Logo = ({ className, themeLines, themeCheck }) => {
  return (
    <div className={`${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
      >
        <title>Text Checked</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer2"
          fill="none"
          stroke={themeLines}
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M2 8h60M2 24h60M2 40h24M2 56h24"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
        <path
          data-name="layer1"
          fill="none"
          stroke={themeCheck}
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M35 45l8 9 16-16"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export default Logo;

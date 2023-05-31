import React from "react";
import "./BackgroundWrapper.css";

function BackgroundWrapper({ children, image }) {
  return (
    <div
      className="background-wrapper"
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </div>
  );
}

export default BackgroundWrapper;

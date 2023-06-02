import headerVideo from "../../assets/videos/header.webm";
import React from "react";
import ReactPlayer from "react-player";

function HeaderVideo() {
  return (
    <ReactPlayer
      url={headerVideo}
      playing
      loop
      muted
      width="100%"
      height="100%"
    />
  );
}

export default HeaderVideo;

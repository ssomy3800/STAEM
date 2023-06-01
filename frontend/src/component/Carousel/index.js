import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Carousel.css";

// list of game images
const gameImages = [
  "gameImage1.png",
  "gameImage2.png",
  "gameImage3.png",
  "gameImage4.png",
  "gameImage5.png",
  "gameImage6.png",
];

function Carousel() {
  return (
    <ResponsiveCarousel
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop
      useKeyboardArrows
      dynamicHeight
    >
      {gameImages.map((img, idx) => (
        <div key={idx}>
          <img src={img} alt={`game-${idx}`} />
        </div>
      ))}
    </ResponsiveCarousel>
  );
}

export default Carousel;

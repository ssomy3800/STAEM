import React, { useState } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
import csgo from "../../assets/images/csgo.png";
import lostark from "../../assets/images/lostark.png";

// list of game images
const gameData = [
  {
    image: csgo,
    title: "Counter-Strike: Global Offensive",
    description:
      "CS:GO is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.",
    inGameImages: [csgo, csgo],
  },
  {
    image: lostark,
    title: "Counter-Strike: Global Offensive",
    description:
      "CS:GO is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.",
    inGameImages: [lostark, lostark],
  },
  {
    image: csgo,
    title: "Counter-Strike: Global Offensive",
    description:
      "CS:GO is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.",
    inGameImages: [lostark, csgo, csgo, csgo],
  },
  // ... other games
];

function Carousel() {
  const [hoveredImage, setHoveredImage] = useState(null);

  // log the hoveredImage whenever it changes
  console.log(hoveredImage);

  return (
    <ResponsiveCarousel
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop
      useKeyboardArrows
      dynamicHeight
    >
      {gameData.map((game, idx) => (
        <div key={idx} className={`carousel-slide`}>
          <img
            className="carousel-slide-image"
            src={hoveredImage || game.image}
            alt={game.title}
            style={{ display: hoveredImage ? "none" : "block" }}
          />
          {hoveredImage && (
            <img src={hoveredImage} className="carousel-slide-image-hovered" />
          )}
          <div className="carousel-slide-content">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div className="carousel-slide-ingame-images">
              {game.inGameImages.map((img, id) => (
                <img
                  key={id}
                  src={img}
                  alt={`in-game-${id}`}
                  onMouseEnter={() => {
                    console.log('Mouse Enter');
                    setHoveredImage(img);
                  }}
                  onMouseLeave={() => {
                    console.log('Mouse Leave');
                    setHoveredImage(null);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </ResponsiveCarousel>
  );
}

export default Carousel;
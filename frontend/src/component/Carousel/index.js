
import React, { useState, useEffect } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../../store/gamesreducer";

function Carousel() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    dispatch(fetchGames()); // Fetch games data from the backend
  }, [dispatch]);

  return (
    <ResponsiveCarousel
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop
      useKeyboardArrows
      dynamicHeight
    >
      {games.map((game) => (
        <div key={game.id} className={`carousel-slide`}>
          <img
            className="carousel-slide-image"
            src={hoveredImage || game.images[0]} // The first image in the array is the main image
            alt={game.title}
            style={{ display: hoveredImage ? "none" : "block" }}
            onClick={() => history.push(`/games/${game.id}`)}
          />

          {hoveredImage && (
            <img src={hoveredImage} className="carousel-slide-image-hovered" />
          )}
          <div className="carousel-slide-content">
            <h2>{game.title}</h2>
            <p>{game.shortDescription}</p>
            <div className="carousel-slide-ingame-images">
              {game.images.slice(1).map((img, id) => ( // The rest of the images in the array are in-game images
                <img
                  key={id}
                  src={img}
                  alt={`in-game-${id}`}
                  onMouseEnter={() => {
                    setHoveredImage(img);
                  }}
                  onMouseLeave={() => {
                    setHoveredImage(null);
                  }}
                  onClick={() => history.push(`/games/${game.id}`)}
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

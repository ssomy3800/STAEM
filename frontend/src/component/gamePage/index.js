import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./gamePage.css";
import SearchBar from "../searchBar";

function GamePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const gameImages = Object.entries(game.images).map(
    ([filename, imageUrl], index) => (
      <div key={index}>
        <img className="carousel-image" src={imageUrl} alt={filename} />
      </div>
    )
  );
  const firstImageUrl = game.images[Object.keys(game.images)[0]];

  return (
    <>
      <SearchBar />
      <div className="game-page">
        <div className="game-carousel">
          <ResponsiveCarousel
            showThumbs={true}
            autoPlay
            infiniteLoop
            useKeyboardArrows
          >
            {game.video && (
              <div>
                <video
                  poster={game.videoPreview}
                  className="carousel-image"
                  src={game.video}
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {gameImages}
          </ResponsiveCarousel>
        </div>
        <div className="rightside">
        <img src={firstImageUrl} alt="Game Cover" className="game-cover" />
        <div className="game-info">
          <h2>{game.title}</h2>
          <p>Publisher: {game.publisher}</p>
          <p>Developer: {game.developer}</p>
          <p>Publish Date: {game.publishDate}</p>
          <p>Short Description: {game.shortDescription}</p>
          <p>Long Description: {game.longDescription}</p>
        </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;

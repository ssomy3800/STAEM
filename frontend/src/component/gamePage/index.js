import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";
import { addGameToCart } from "../../store/carteditemreducer";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./gamePage.css";
import SearchBar from "../searchBar";
import { fetchUserCart, fetchUserStorage } from "../../store/carteditemreducer";

function GamePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const cartedItems = useSelector((state) => state.cart);

  const [purchased, setPurchased] = useState(null);

  useEffect(() => {
    if (game) {
      let found = false;
      let currentPurchased;
      for (let key in cartedItems) {
        // Iterate over each individual item in the current property
        for (let itemKey in cartedItems[key]) {
          for (let itemitemKey in cartedItems[key][itemKey]) {
            let cartedItem = cartedItems[key][itemKey][itemitemKey];

            if (cartedItem.gameId === game.id) {
              currentPurchased = cartedItem.purchased;
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }

      if (found) {
        setPurchased(currentPurchased);
      } else {
        setPurchased(undefined);
      }
    }
  }, [game]); // Include 'game' in the dependencies

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCart(currentUser.id));
      dispatch(fetchUserStorage(currentUser.id));
    }
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const addToCart = () => {
    if (currentUser) {
      if (purchased) {
        history.push("/storage");
      } else if (purchased === false) {
        history.push("/cart");
      } else {
        dispatch(addGameToCart(game, currentUser.id));
        setPurchased(false); // set purchased state manually
      }
    } else {
      history.push("/login");
    }
  };

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
            <button onClick={addToCart}>
              {purchased === true
                ? "Play!"
                : purchased === false
                ? "Go to Cart!"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;

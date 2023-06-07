import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";
import { addGameToCart } from "../../store/carteditemreducer";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./gamePage.css";
import SearchBar from "../searchBar";
import { fetchUserCart } from "../../store/carteditemreducer";

function GamePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const cartedItems = useSelector((state) => state.cart.cartedItems);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCart(currentUser.id));
    }
    dispatch(fetchGame(id));
  }, [dispatch, id]);
  let purchased;
  const addToCart = () => {
    for (let key in cartedItems) {
      if (cartedItems[key].gameId === game.id) {
        purchased = cartedItems[key].purchased;
        break;
      }
    }
    if (currentUser) {
      if (purchased) {
        history.push("/storage");
      } else if (purchased === false) {
        history.push("/cart");
      } else {
        dispatch(addGameToCart(game, currentUser.id));
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

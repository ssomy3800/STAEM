import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";

function GamePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  // If the game data has not yet been fetched, render a loading message
  if (!game) {
    return <div>Loading...</div>;
  }

  // Render the game data
  return (
    <div>
      <h2>{game.title}</h2>
      <p>Publisher: {game.publisher}</p>
      <p>Short Description: {game.shortDescription}</p>
      <p>Long Description: {game.longDescription}</p>
      {Object.entries(game.images).map(([filename, imageUrl], index) => (
        <img key={index} src={imageUrl} alt={filename} />
      ))}
      {game.video && (
        <video src={game.video} controls>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default GamePage;

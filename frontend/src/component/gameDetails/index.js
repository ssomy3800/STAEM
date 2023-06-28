function GameDetails({ game }) {
  return (
    <div className="game-details">
      <h4>{game.title}</h4>
      <div>
        {game.tags.slice(0, 5).map((tag, index) => (
          <div key={index}>{tag}</div>
        ))}
      </div>
      <div>
        {game.images.slice(0, 4).map((image, index) => (
          <img key={index} src={image} alt={`game-img-${index}`} />
        ))}
      </div>
    </div>
  );
}
export default GameDetails;

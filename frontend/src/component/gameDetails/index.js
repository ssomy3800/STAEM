import "./gameDetails.css";

function GameDetails({ game }) {
  return (
    <div className="game-details">
      <h4>{game.title}</h4>
      <div className="detail-tags">
        {game.tags.slice(0, 5).map((tag, index) => (
          <div className="each-tags" key={index}>
            {tag}
          </div>
        ))}
      </div>
      <div className="game-detail-images">
        {game.images.slice(0, 4).map((image, index) => (
          <img key={index} src={image} alt={`game-img-${index}`} />
        ))}
      </div>
    </div>
  );
}
export default GameDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { Link } from "react-router-dom";
import "./Tag.css";

const TagPage = () => {
  const [games, setGames] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      const response = await csrfFetch(`/api/tags/${name}`);
      const data = await response.json();
      setGames(data.games);
    };

    fetchGames();
  }, [name]);

  return (
    <div className="storage-container">
      <p className="tagg">Games for Tag: {name}</p>
      <div className="home-games-container">
        {games.map((game) => (
          <Link to={`/games/${game.id}`} key={game.id}>
            <div key={game.id} className="home-game-row">
              <div className="home-game-image-container"></div>
              <div className="home-game-info-container">
                <h3 className="home-game-title">{game.title}</h3>
                <div className="home-game-tags">
                  {game.tags.map((tag) => (
                    <span key={tag} className="home-game-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="home-game-price">${game.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagPage;

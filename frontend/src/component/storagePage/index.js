import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserStorage } from "../../store/carteditemreducer";
import "./Storage.css";

const StoragePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const id = currentUser ? currentUser.id : null;
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserStorage(id)).then((done) => {
        if (done === false) {
          setIsLoading(false);
        }
      });
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="storage-container">
      <div className="home-games-container">
        {games.map((game) => (
          <div key={game.id} className="home-game-row">
            <div className="home-game-image-container">
              <img
                className="home-game-image"
                src={game.images[0]}
                alt={game.title}
              />
            </div>
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
        ))}
      </div>
    </div>
  );
};

export default StoragePage;

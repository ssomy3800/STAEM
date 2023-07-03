import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import {
  removeGameFromCart,
  fetchUserCart,
  purchaseCartedItem,
} from "../../store/carteditemreducer";

const CartPage = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const id = currentUser ? currentUser.id : null;
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserCart(id));
    }
  }, [dispatch, id]);

  const handleRemoveFromCart = (gameId, userId) => {
    dispatch(removeGameFromCart(gameId, userId));
  };

  const handlePurchaseItem = (gameId, userId) => {
    dispatch(purchaseCartedItem(gameId, userId));
  };

  const handlePurchaseAll = (userId) => {
    games.forEach((game) => {
      dispatch(purchaseCartedItem(game.id, userId));
    });
  };

  return (
    <div className="cart-container">
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
            <button onClick={() => handlePurchaseItem(game.id, currentUser.id)}>
              Purchase
            </button>
            <button
              onClick={() => handleRemoveFromCart(game.id, currentUser.id)}
            >
              Remove from Cart
            </button>
            <div className="home-game-price">${game.price}</div>
          </div>
        ))}
      </div>
      <button id="purchase-all" onClick={() => handlePurchaseAll(currentUser.id)}>
        Purchase All
      </button>
    </div>
  );
};

export default CartPage;

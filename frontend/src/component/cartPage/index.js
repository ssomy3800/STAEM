import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserCart(id)).then((done) => {
        if (done === false) {
          setIsLoading(false);
        }
      });
    }
  }, [dispatch, id]);

  if (isLoading && games.length > 0) {
    return <div className="loading">Loading...</div>;
  }

  const handleRemoveFromCart = (gameId, userId) => {
    dispatch(removeGameFromCart(gameId, userId));
  };

  const handlePurchaseItem = (gameId, userId) => {
    dispatch(purchaseCartedItem(gameId, userId));
    setShowModal(true);
  };

  const handlePurchaseAll = (userId) => {
    games.forEach((game) => {
      dispatch(purchaseCartedItem(game.id, userId));
      setShowModal(true);
    });
  };
  const handleCloseModal = () => {
    setShowModal(false); // <-- Close the modal
  };

  return (
    <div className="cart-container">
      <div className="cart-title">
        <span>Your Cart</span>
      </div>
      {games.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty.</div>
      ) : (
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
              <button
                className="cart-button"
                onClick={() => handlePurchaseItem(game.id, currentUser.id)}
              >
                Purchase
              </button>
              <button
                className="cart-button"
                onClick={() => handleRemoveFromCart(game.id, currentUser.id)}
              >
                Remove from Cart
              </button>
              <div className="home-game-price">${game.price}</div>
            </div>
          ))}
        </div>
      )}
      <button
        id="purchase-all"
        className="cart-button"
        onClick={() => handlePurchaseAll(currentUser.id)}
      >
        Purchase All
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <p className="confirmation-message">
              You are all set! You can check it out in your storage page.
            </p>
            <div className="steam-logo">Staem</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

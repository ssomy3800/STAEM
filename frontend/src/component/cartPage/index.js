import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    <div>
      <h2>Cart</h2>
      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <button onClick={() => handlePurchaseItem(game.id, currentUser.id)}>
            Purchase
          </button>
          <button onClick={() => handleRemoveFromCart(game.id, currentUser.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
      <button onClick={() => handlePurchaseAll(currentUser.id)}>
        Purchase All
      </button>
    </div>
  );
};

export default CartPage;

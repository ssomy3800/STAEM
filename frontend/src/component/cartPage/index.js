import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeGameFromCart } from "../../store/carteditemreducer";
import { fetchUserCart } from "../../store/carteditemreducer";
import { fetchCartGames } from "../../store/gamesreducer";

const CartPage = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const id = currentUser ? currentUser.id : null;
  const dispatch = useDispatch();
  const cartedItems = useSelector((state) => state.cart);

  const games = useSelector((state) => state.games.list);

  useEffect(() => {
    //////////////////// to see which items are in the cart////////////
    dispatch(fetchUserCart(id));
  }, [dispatch, id]);

  const [prevGameIds, setPrevGameIds] = useState([]);

  useEffect(() => {
    const gameIds = cartedItems.map((cartedItem) => cartedItem.gameId);
    if (!arrayEquals(gameIds, prevGameIds)) {
      dispatch(fetchCartGames(gameIds));
      setPrevGameIds(gameIds);
    }
  }, [dispatch, cartedItems, prevGameIds]);
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  const handleRemoveFromCart = (gameId, userId) => {
    dispatch(removeGameFromCart(gameId, userId));
  };

  return (
    <div>
      <h2>Cart</h2>
      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <button onClick={() => handleRemoveFromCart(game.id, currentUser.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;

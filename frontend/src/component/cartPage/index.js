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

  const [games, setGames] = useState([]);


  useEffect(() => {
    //////////////////// to see which items are in the cart////////////

    dispatch(fetchUserCart(id));
  }, [dispatch, id]);

  useEffect(() => {
    const gameIds = cartedItems.map((cartedItem) => cartedItem.gameId);
 
    fetchCartGames(gameIds)().then((games) => setGames(games));
  }, [dispatch, cartedItems]);

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

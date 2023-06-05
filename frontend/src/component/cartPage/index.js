import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeGameFromCart } from "../../store/carteditemreducer";
import { fetchUserCart } from "../../store/carteditemreducer";
import { fetchGame } from "../../store/gamesreducer";

const CartPage = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const id = currentUser ? currentUser.id : null;
  const dispatch = useDispatch();
  const cartedItems = useSelector((state) => state.cart);

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Replace `userId` with the actual user ID you have
    dispatch(fetchUserCart(id));
  }, [dispatch]);

  useEffect(() => {
    // Fetch details for each game in the cart
    cartedItems.forEach((cartedItem) => {
      console.log(cartedItem.gameId);
      console.log('33333333333333333333333333333333333333333333333')
      dispatch(fetchGame(cartedItem.gameId)).then((game) => {
        console.log(game);
        console.log('44444444444444444444444444444444444')
        setGames((prevGames) => [...prevGames, game]);
      });
    });
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

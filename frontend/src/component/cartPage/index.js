import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeGameFromCart } from "../../store/carteditemreducer";
import { fetchUserCart } from "../../store/carteditemreducer";


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

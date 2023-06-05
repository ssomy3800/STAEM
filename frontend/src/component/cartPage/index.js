import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeGameFromCart } from "../../store/carteditemreducer";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartedItems = useSelector((state) => state.cartedItems);
  debugger;
  console.log(cartedItems);
  const handleRemoveFromCart = (gameId, userId) => {
    dispatch(removeGameFromCart(gameId, userId));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartedItems.map((cartedItem) => (
        <div key={cartedItem.id}>
          <h3>{cartedItem.game.title}</h3>
          <button
            onClick={() =>
              handleRemoveFromCart(cartedItem.game.id, cartedItem.user_id)
            }
          >
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;

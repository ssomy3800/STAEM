import { csrfFetch } from "./csrf";

// Action Types
const ADD_TO_CART = "cartedItems/ADD_TO_CART";
const REMOVE_FROM_CART = "cartedItems/REMOVE_FROM_CART";
const SET_CART = "cartedItems/SET_CART";

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const fetchUserCart = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/cart`);

  if (res.ok) {
    const cart = await res.json();
    dispatch(setCart(cart));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

const addToCart = (game) => ({
  type: ADD_TO_CART,
  game,
});

const removeFromCart = (gameId) => ({
  type: REMOVE_FROM_CART,
  gameId,
});

export const addGameToCart = (game, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carted_item: { game_id: game.id, purchased: false },
    }),
  });

  if (res.ok) {
    const newCartedItem = await res.json();
    dispatch(addToCart(newCartedItem));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

export const removeGameFromCart = (gameId, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/cart/${gameId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeFromCart(gameId));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

// Initial State
const initialState = [];

// Reducer
const cartedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      console.log("Setting cart...", action.payload);
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.game];
    case REMOVE_FROM_CART:
      return state.filter((game) => game.id !== action.gameId);
    default:
      return state;
  }
};

export default cartedItemsReducer;

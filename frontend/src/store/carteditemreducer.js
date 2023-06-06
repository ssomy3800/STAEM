import { csrfFetch } from "./csrf";

// Action Types
const ADD_TO_CART = "cartedItems/ADD_TO_CART";
const REMOVE_FROM_CART = "cartedItems/REMOVE_FROM_CART";
const SET_CART = "cartedItems/SET_CART";
const SET_STORAGE = "cartedItems/SET_STORAGE";

const setStorage = (storage) => ({
  type: SET_STORAGE,
  storage,
});
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const fetchUserStorage = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/storage`);

  if (res.ok) {
    const storage = await res.json();
    dispatch(setStorage(storage));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

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

  const res = await csrfFetch(`/api/users/${userId}/cart?game_id=${gameId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeFromCart(gameId));
    // dispatch(fetchUserCart(userId));
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
      return [...action.cart];
    case ADD_TO_CART:
      return [...state, action.game];
    case REMOVE_FROM_CART:
      const newState = [...state];

      return newState.filter((cartedGame) => cartedGame.gameId !== action.gameId);

    default:
      return state;
  }
};

export default cartedItemsReducer;


/// game slice state needs to fetch for each page (fetch new games base on which page you are on)
/// carteditem reducer state needs to be objects instead of array---- the jbuilder should return object instead of array
/// refactor the component to dispatch the fetch request instead of use .then
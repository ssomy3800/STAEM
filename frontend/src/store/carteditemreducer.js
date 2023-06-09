import { csrfFetch } from "./csrf";
import { fetchCartGames } from "./gamesreducer";
import { clearGames } from "./gamesreducer";

// Action Types
const ADD_TO_CART = "cartedItems/ADD_TO_CART";
const REMOVE_FROM_CART = "cartedItems/REMOVE_FROM_CART";
const SET_CART = "cartedItems/SET_CART";
const SET_STORAGE = "cartedItems/SET_STORAGE";
const PURCHASE_ITEM = "cartedItems/PURCHASE_ITEM";

const purchaseItem = (gameId) => ({
  type: PURCHASE_ITEM,
  gameId,
});
const setStorage = (storage) => ({
  type: SET_STORAGE,
  storage,
});
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const purchaseCartedItem = (gameId, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carted_item: { game_id: gameId, purchased: true },
    }),
  });

  if (res.ok) {
    dispatch(purchaseItem(gameId));
    await dispatch(fetchUserCart(userId));
    // dispatch(fetchUserStorage(userId)); // Refresh the storage
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

export const fetchUserStorage = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/storage`);

  if (res.ok) {
    const storage = await res.json();

    dispatch(setStorage(storage));

    // If the storage has items, fetch their corresponding games
    if (
      Object.values(storage)[0] &&
      Object.values(Object.values(storage)[0]).length > 0
    ) {
      const gameIds = Object.values(Object.values(storage)[0]).map(
        (item) => item.gameId
      );

      return dispatch(fetchCartGames(gameIds));
    } else {
      // If the storage is empty, clear the games
      dispatch(clearGames());
    }
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

    // If the cart has items, fetch their corresponding games
    if (
      Object.values(cart)[0] &&
      Object.values(Object.values(cart)[0]).length > 0
    ) {
      const gameIds = Object.values(Object.values(cart)[0]).map(
        (item) => item.gameId
      );

      return dispatch(fetchCartGames(gameIds));
    } else {
      // If the cart is empty, clear the games
      dispatch(clearGames());
    }
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
    dispatch(fetchUserCart(userId)); // change here
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

const initialState = {
  cartedItems: {},
  storageItems: {},
};

// Reducer
const cartedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cartedItems: action.cart };
    case SET_STORAGE:
      return { ...state, storageItems: action.storage };
    case ADD_TO_CART:
      const newCartedItem = action.game;
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          [newCartedItem.id]: newCartedItem,
        },
      };
    case REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState.cartedItems[action.gameId];
      return newState;

    case PURCHASE_ITEM: {
      const newState = { ...state };
      delete newState.cartedItems[action.gameId];
      return newState;
    }
    default:
      return state;
  }
};

export default cartedItemsReducer;

import { csrfFetch } from "./csrf";

// ACTION TYPES
const SET_GAMES = "games/SET_GAMES";
const SET_GAME = "games/SET_GAME";
const SET_SEARCH_RESULTS = "games/SET_SEARCH_RESULTS";
const CLEAR_GAMES = "games/CLEAR_GAMES";
// ACTION CREATORS
const setGames = (games) => ({
  type: SET_GAMES,
  payload: games,
});
export const clearGames = () => ({
  type: CLEAR_GAMES,
});

const setGame = (game) => ({
  type: SET_GAME,
  payload: game,
});
const setSearchResults = (games) => ({
  type: SET_SEARCH_RESULTS,
  payload: games,
});
// THUNK ACTIONS

export const fetchGame = (gameId) => async (dispatch) => {
  let res = await csrfFetch(`/api/games/${gameId}`);

  if (res.ok) {
    let game = await res.json();

    game.images = game.images.reduce((obj, imageUrl) => {
      const filename = imageUrl.split("/").pop();
      obj[filename] = imageUrl;

      return obj;
    }, {});
    dispatch(setGame(game));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

export const fetchGames = () => async (dispatch) => {
  let res = await csrfFetch("/api/games");

  if (res.ok) {
    let data = await res.json();

    dispatch(setGames(data));
  } else {
    const errorResponse = await res.json();

    throw new Error(JSON.stringify(errorResponse));
  }
};

export const fetchCartGames = (gameIds) => async (dispatch) => {
  const games = [];

  for (const gameId of gameIds) {
    let res = await csrfFetch(`/api/games/${gameId}`);
    if (res.ok) {
      let game = await res.json();
      games.push(game);
    } else {
      const errorResponse = await res.json();
      throw new Error(JSON.stringify(errorResponse));
    }
  }

  dispatch(setGames(games));
  return false;
};

export const fetchGamesByName = (name) => async (dispatch) => {
  if (name === "") {
    dispatch(setSearchResults([]));
    return;
  }
  let res = await csrfFetch(`/api/games/search/${name}`);
  if (res.ok) {
    let data = await res.json();
    dispatch(setSearchResults(data));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

// INITIAL STATE
const initialState = {
  list: [],
  current: null,
};

// REDUCER
const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAMES:
      return {
        ...state,
        list: action.payload,
      };
    case SET_GAME:
      return {
        ...state,
        current: action.payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case CLEAR_GAMES:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};

export default gamesReducer;

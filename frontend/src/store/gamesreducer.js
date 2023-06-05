import { csrfFetch } from "./csrf";

// ACTION TYPES
const SET_GAMES = "games/SET_GAMES";
const SET_GAME = "games/SET_GAME";
const SET_SEARCH_RESULTS = "games/SET_SEARCH_RESULTS";
// ACTION CREATORS
const setGames = (games) => ({
  type: SET_GAMES,
  payload: games,
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
    // Convert the images array to an object
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
    console.log(data);
    dispatch(setGames(data));
  } else {
    const errorResponse = await res.json();

    throw new Error(JSON.stringify(errorResponse));
  }
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
      console.log("Setting games...", action.payload);
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
    default:
      return state;
  }
};

export default gamesReducer;

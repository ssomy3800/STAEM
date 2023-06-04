import { csrfFetch } from "./csrf";

// ACTION TYPES
const SET_GAMES = "games/SET_GAMES";
const SET_GAME = "games/SET_GAME";

// ACTION CREATORS
const setGames = (games) => ({
  type: SET_GAMES,
  payload: games,
});

const setGame = (game) => ({
  type: SET_GAME,
  payload: game,
});

// THUNK ACTIONS
export const fetchGame = (gameId) => async (dispatch) => {
    let res = await csrfFetch(`/api/games/${gameId}`);
    if (res.ok) {
      let data = await res.json();
      dispatch(setGame(data.game));
    } else {
      const errorResponse = await res.json();
      throw new Error(JSON.stringify(errorResponse));
    }
  };
  
  export const fetchGames = () => async (dispatch) => {
    let res = await csrfFetch("/api/games");
    if (res.ok) {
      let data = await res.json();
      dispatch(setGames(data.games));
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
    default:
      return state;
  }
};

export default gamesReducer;

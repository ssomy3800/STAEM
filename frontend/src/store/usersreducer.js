import { csrfFetch } from "./csrf";

// ACTION TYPES
const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

// ACTION CREATORS
export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});
// THUNK ACTION CREATORS
export const loginUser = (user) => async (dispatch) => {
  let res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (res.ok) {
    let data = await res.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

export const logoutUser = (userId) => async (dispatch) => {
  let res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  sessionStorage.setItem("currentUser", null);
  dispatch(removeUser(userId));
};

export const createUser = (user) => async (dispatch) => {
  let res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (res.ok) {
    let data = await res.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
  } else {
    const errorResponse = await res.json();
    throw new Error(JSON.stringify(errorResponse));
  }
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

// REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;

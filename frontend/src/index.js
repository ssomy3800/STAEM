import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createUser, loginUser, logoutUser } from "./store/usersreducer";
import { restoreSession } from "./store/csrf";
import configureStore from "./store";
import { csrfFetch } from "./store/csrf";
import { fetchGames } from "./store/gamesreducer";

let currentUser;
let storedUser = sessionStorage.getItem("currentUser");
if (storedUser) {
  currentUser = JSON.parse(storedUser);
}
let initialState = {};

if (currentUser) {
  initialState = {
    users: {
      [currentUser.id]: currentUser,
    },
  };
}

const store = configureStore(initialState);

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
}
window.createUser = createUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.games = fetchGames

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const initializeApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

restoreSession().then(initializeApp);

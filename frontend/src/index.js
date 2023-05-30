import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createUser, loginUser, logoutUser } from "./store/usersreducer";
import { restoreSession } from "./store/csrf";
import configureStore from "./store";

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let initialState = {};

if (currentUser) {
  initialState = {
    users: {
      [currentUser.id]: currentUser,
    },
  };
}

const store = configureStore(initialState);

window.createUser = createUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;

const initializeApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

restoreSession().then(initializeApp);

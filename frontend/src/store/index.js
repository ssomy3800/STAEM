import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./usersreducer";
import gamesReducer from "./gamesreducer";
import cartedItemsReducer from "./carteditemreducer";
import commentsReducer from "./commentsreducer";
import tagsReducer from "./tagsreducer";

export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
  cart: cartedItemsReducer,
  comments: commentsReducer,
  tags: tagsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

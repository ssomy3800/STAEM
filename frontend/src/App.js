import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./component/loginFormPage";
import HomePage from "./component/homePage/homePage";
import SignupFormPage from "./component/signUpFormPage";
import Navigation from "./component/Navigation";
import GamePage from "./component/gamePage";
import CartPage from "./component/cartPage";
import StoragePage from "./component/storagePage";
import TagPage from "./component/tagPage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/tags/:name">
          <TagPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/games/:id">
          <GamePage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/storage">
          <StoragePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

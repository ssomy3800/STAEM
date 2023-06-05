import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./component/loginFormPage";
import HomePage from "./component/homePage/homePage";
import SignupFormPage from "./component/signUpFormPage";
import Navigation from "./component/Navigation";
import GamePage from './component/gamePage';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <HomePage />
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
      </Switch>
    </>
  );
}

export default App;

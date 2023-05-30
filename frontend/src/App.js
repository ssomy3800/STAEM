import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./component/loginFormPage";
import HomePage from "./component/homePage/homePage";
import SignupFormPage from "./component/signUpFormPage";

function App() {
  return (
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
    </Switch>
  );
}

export default App;

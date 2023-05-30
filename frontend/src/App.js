import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./component/loginFormPage";
import HomePage from "./component/homePage/homePage";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;

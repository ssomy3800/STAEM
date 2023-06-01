import React, { useState } from "react";
import * as userActions from "../../store/usersreducer";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.user.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(userActions.loginUser({ username, password })).catch(
      (err) => {
        let data;
        try {
          data = JSON.parse(err.message);
        } catch {
          data = err.message;
        }
        if (data?.errors) setErrors(data.errors[0]);
        else setErrors([data]);
        setPassword("");
      }
    );
  };

  const handleDemoUser = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(
      userActions.loginUser({ username: "DemoUser", password: "DemoPassword" })
    ).catch((err) => {
      let data;
      try {
        data = JSON.parse(err.message);
      } catch {
        data = err.message;
      }
      if (data?.errors) setErrors(data.errors[0]);
      else setErrors([data]);
    });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>{errors}</ul>
        <label>
          Username or Email
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-button" type="submit">
          Log In
        </button>
        <button className="login-button" onClick={handleDemoUser}>
          Log In as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;

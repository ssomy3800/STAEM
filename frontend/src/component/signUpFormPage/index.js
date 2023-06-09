import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../store/usersreducer";

import "./SignupForm.css";
import { csrfFetch } from "../../store/csrf";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.user.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null); // New state for storing the captured image

  let confirmedPWError = false;

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    let errorMessages = [];

    if (password === confirmPassword) {
      dispatch(
        userActions.createUser({
          username,
          firstname,
          lastname,
          email,
          password,
          image, // Include the image when dispatching the action
        })
      ).catch((err) => {
        let data;

        try {
          data = JSON.parse(err.message);
        } catch {
          data = err.message;
        }
        if (data?.errors) errorMessages = [...errorMessages, ...data.errors[0]];
        else errorMessages.push(data);
        setErrors(errorMessages);
        setPassword(""); // Reset the password field
        setConfirmPassword(""); // Reset the confirmPassword field
      });
    } else {
      confirmedPWError = true;
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  const getUsernameError = errors[0]?.find((error) =>
    error.includes("Username")
  );
  const getEmailError = errors[0]?.find((error) => error.includes("Email"));
  const getPasswordError = errors[0]?.find((error) =>
    error.includes("Password")
  );

  const ErrorList = () => (
    <ul>
      {errors[0]?.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );

  return (
    <div className="signup">
      <ErrorList />
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={getUsernameError ? "error" : ""}
            required
          />
        </label>
        <label>
          Firstname
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Lastname
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={getEmailError ? "error" : ""}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={getPasswordError ? "error" : ""}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={confirmedPWError ? "error" : ""}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;

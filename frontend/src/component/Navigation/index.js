import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton.js";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.user.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="sessionLinks">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="navbar">
      <NavLink exact to="/">
        <i className="fa-brands fa-steam"></i>
      </NavLink>
      {sessionLinks}
    </div>
  );
}

export default Navigation;

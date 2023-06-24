import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.user.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="right">
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="right">
        <NavLink to="/login">
          <div className="sessionLinks">Log In</div>
        </NavLink>
        <NavLink to="/signup">
          <div className="sessionLinks">Sign Up</div>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="left">
        <div className="steamLogo">
          <NavLink exact to="/">
            <i className="fa-brands fa-steam"></i>
          </NavLink>
          STAEM
        </div>
        {sessionUser ? `Welcome! ${sessionUser.username}` : null}
      </div>
      <div className="mid">
        <div className="store">
          <a
            href="https://github.com/ssomy3800"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/hong-chen-5779311a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          {sessionUser && (
            <div className="storeLink">
              <NavLink to="/cart">Cart</NavLink>
            </div>
          )}
          {sessionUser && (
            <div className="storeLink">
              <NavLink to="/storage">Storage</NavLink>
            </div>
          )}
        </div>
      </div>

      {sessionLinks}
    </div>
  );
}

export default Navigation;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as userActions from "../../store/usersreducer";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(userActions.logoutUser());
  };

  return (
    <div className="dropdown-menu">
      <button className="user-profile-button" onClick={openMenu}>
        <i className="fa-solid fa-user-circle" />
        {showMenu && (
          <ul className="dropdown-item">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </button>
    </div>
  );
}
export default ProfileButton;

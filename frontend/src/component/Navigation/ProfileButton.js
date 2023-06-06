import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import * as userActions from "../../store/usersreducer";

function ProfileButton({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(userActions.logoutUser());
    window.location.replace("/");
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="profile-button-container" ref={dropdownRef}>
      <button className="profile-button" onClick={handleClick}>
        <i className="fa-solid fa-user-circle" />
      </button>
      {open && (
        <div className="dropdown">
          <div className="dropdown-item">{user.username}</div>
          <div className="dropdown-item">{user.email}</div>
          <div className="dropdown-divider" />
          <div className="dropdown-item" onClick={logout}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;

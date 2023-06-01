import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import * as userActions from "../../store/usersreducer";

function ProfileButton({ user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(userActions.logoutUser());
  };

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" as="div">
          <i className="fa-solid fa-user-circle" />
        </Dropdown.Toggle>
        {open && (
          <Dropdown.Menu>
            <Dropdown.Item href="#">{user.username}</Dropdown.Item>
            <Dropdown.Item href="#">{user.email}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
}
export default ProfileButton;

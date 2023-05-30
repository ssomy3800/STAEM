import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/usersreducer";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) =>
    JSON.parse(sessionStorage.getItem("currentUser"))
  );

  const handleLogout = () => {
    dispatch(userActions.logoutUser(currentUser.id));
  };
  return (
    <div>
      <h1>Homepage</h1>
      {currentUser ? (
        <>
          <h2>Welcome, {currentUser.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Go to Login</Link>
          <br />
          <Link to="/signup">Go to Signup</Link>
        </>
      )}
    </div>
  );
}

export default HomePage;

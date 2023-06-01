import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/usersreducer";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) =>
    JSON.parse(sessionStorage.getItem("currentUser"))
  );

  return (
    <div className="home">
      {currentUser && <h2 id="user-welcome">Welcome, {currentUser.username}!</h2>}
    </div>
  );
}

export default HomePage;

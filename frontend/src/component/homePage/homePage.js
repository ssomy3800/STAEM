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
      <div className="home-body">
        <div className="block1"></div>
        <div className="block2"></div>
      </div>
    </div>
  );
}

export default HomePage;

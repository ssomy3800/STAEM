import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/usersreducer";
import Carousel from "../Carousel";
import "./HomePage.css";
import HeaderVideo from "../Header";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) =>
    JSON.parse(sessionStorage.getItem("currentUser"))
  );

  return (
    <div className="home">
      <HeaderVideo />
      <div className="home-body">
        <div className="block1"></div>
        <div className="block2">
          <div className="recommend-text">Recommanded:</div>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

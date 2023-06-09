import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import Carousel from "../Carousel";
import "./HomePage.css";
import SearchBar from "../searchBar";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/adventure.png";
import img2 from "../../assets/images/anime.png";
import img3 from "../../assets/images/exp.png";
import img4 from "../../assets/images/science_fiction.png";
import img5 from "../../assets/images/glass.png";
import gif1 from "../../assets/images/deck.gif";

import HeaderVideo from "../Header";
import * as tagActions from "../../store/tagsreducer";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) =>
    JSON.parse(sessionStorage.getItem("currentUser"))
  );
  const tags = useSelector((state) => state.tags); // Access tags from the Redux store

  useEffect(() => {
    dispatch(tagActions.getTags()); // Fetch tags when the component mounts
  }, [dispatch]);

  return (
    <div className="home">
      <SearchBar />
      <HeaderVideo />

      <div className="home-body">
        <div className="block1">
          <div className="tags-container">
            <p className="popular-tags">Popular Tags</p>
            <div className="tags">
              {tags &&
                tags.map((tag) => (
                  <Link to={`/tags/${tag.name}`} key={tag.id}>
                    <div className="tag">{tag.name}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="block2">
          <div className="recommend-text">Recommanded:</div>
          <Carousel />
          <div className="on-sale">
            <img src={gif1} alt="gif1" />
            <img src={img5} alt="img5" />
          </div>
          <div className="tag-images">
            <Link to="/tags/Adventure">
              <img src={img1} alt="Tag 1" className="tag-image" id="a" />
              <div class="text-overlay">Adventure</div>
            </Link>
            <Link to="/tags/Anime">
              <img src={img2} alt="Tag 2" className="tag-image" id="b" />
              <div class="text-overlay">Anime</div>
            </Link>
            <Link to="/tags/Open-World">
              <img src={img3} alt="Tag 3" className="tag-image" id="c" />
              <div class="text-overlay">Open-World</div>
            </Link>
            <Link to="/tags/Science-Fiction">
              <img src={img4} alt="Tag 4" className="tag-image" id="d" />
              <div class="text-overlay">Science-Fiction</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

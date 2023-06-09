import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import Carousel from "../Carousel";
import "./HomePage.css";
import SearchBar from "../searchBar";
import { Link } from "react-router-dom";

import { fetchGames } from "../../store/gamesreducer";
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
  const games = useSelector((state) => state.games.list);
  const tags = useSelector((state) => state.tags); // Access tags from the Redux store

  useEffect(() => {
    dispatch(tagActions.getTags()); // Fetch tags when the component mounts
    dispatch(fetchGames());
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
              <div className="text-overlay">Adventure</div>
            </Link>
            <Link to="/tags/Anime">
              <img src={img2} alt="Tag 2" className="tag-image" id="b" />
              <div className="text-overlay">Anime</div>
            </Link>
            <Link to="/tags/Open-World">
              <img src={img3} alt="Tag 3" className="tag-image" id="c" />
              <div className="text-overlay">Open-World</div>
            </Link>
            <Link to="/tags/Science-Fiction">
              <img src={img4} alt="Tag 4" className="tag-image" id="d" />
              <div className="text-overlay">Science-Fiction</div>
            </Link>
          </div>

          <div className="home-games-container">
            {games.map((game) => (
              <Link to={`/games/${game.id}`} key={game.id}>
                <div key={game.id} className="home-game-row">
                  <div className="home-game-image-container">
                    <img
                      className="home-game-image"
                      src={game.images[0]}
                      alt={game.title}
                    />
                  </div>
                  <div className="home-game-info-container">
                    <h3 className="home-game-title">{game.title}</h3>
                    <div className="home-game-tags">
                      {game.tags.map((tag) => (
                        <span key={tag} className="home-game-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="home-game-price">${game.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

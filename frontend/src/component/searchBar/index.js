import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGamesByName } from "../../store/gamesreducer";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = useSelector((state) => state.games.searchResults);
  const dropdownRef = useRef(null);
  const searchCooldownTimer = useRef(null);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (searchCooldownTimer.current) {
      clearTimeout(searchCooldownTimer.current); // clear the timer at the start of function
    }
    searchCooldownTimer.current = setTimeout(() => {
      if (searchValue.length >= 1) {
        dispatch(fetchGamesByName(searchValue));
      }
    }, 1000);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchTerm(""); // Clear search term
      dispatch(fetchGamesByName("")); // Clear search results
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="tag-container">
        {/* <span className="tag">Your Store</span>
        <span className="tag">Special Store</span>
        <span className="tag">Category</span>
        <span className="tag">News</span> */}
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search games..."
          onChange={(event) => handleSearch(event.target.value)}
          value={searchTerm}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
        {searchResults && searchResults.length > 0 && (
          <div className="search-results-dropdown" ref={dropdownRef}>
            {searchResults.map((game) => (
              <Link
                to={`/games/${game.id}`}
                className="search-result"
                key={game.id}
              >
                <img
                  className="search-result-image"
                  src={game.images[0]}
                  alt={game.title}
                />
                <div className="search-result-details">
                  <div className="search-result-title">{game.title}</div>
                  <div className="search-result-price">
                    {game.price === 0 ? "Free to Play" : `$${game.price}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

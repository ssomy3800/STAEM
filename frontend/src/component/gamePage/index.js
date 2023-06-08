import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";
import { addGameToCart } from "../../store/carteditemreducer";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./gamePage.css";
import SearchBar from "../searchBar";
import { fetchUserCart, fetchUserStorage } from "../../store/carteditemreducer";

import {
  fetchComments,
  createComment,
  removeComment,
  setActiveComment,
  editComment,
  setActiveCommentId,
} from "../../store/commentsreducer";

function GamePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const cartedItems = useSelector((state) => state.cart);

  const [purchased, setPurchased] = useState(null);

  const comments = useSelector((state) => state.comments.comments);
  const activeComment = useSelector((state) => state.comments.active);

  const [newComment, setNewComment] = useState("");
  const [newCommentLike, setNewCommentLike] = useState(false); // Like/dislike state

  useEffect(() => {
    if (game) {
      dispatch(fetchComments(game.id));
    }
  }, [dispatch, game]);

  const handleAddComment = () => {
    if (currentUser) {
      dispatch(
        createComment({
          content: newComment,
          likes: newCommentLike,
          game_id: game.id,
          user_id: currentUser.id,
          username: currentUser.username,
        })
      );
      setNewComment("");
      setNewCommentLike(false); // Reset the like/dislike state
    } else {
      history.push("/login");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(game.id, commentId));
  };

  const handleEditComment = (commentId) => {
    dispatch(setActiveCommentId(commentId));
  };

  const handleUpdateComment = () => {
    dispatch(editComment(activeComment));
    dispatch(setActiveComment(null));
  };

  useEffect(() => {
    if (game) {
      let found = false;
      let currentPurchased;
      for (let key in cartedItems) {
        // Iterate over each individual item in the current property
        for (let itemKey in cartedItems[key]) {
          for (let itemitemKey in cartedItems[key][itemKey]) {
            let cartedItem = cartedItems[key][itemKey][itemitemKey];

            if (cartedItem.gameId === game.id) {
              currentPurchased = cartedItem.purchased;
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }

      if (found) {
        setPurchased(currentPurchased);
      } else {
        setPurchased(undefined);
      }
    }
  }, [game]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCart(currentUser.id));
      dispatch(fetchUserStorage(currentUser.id));
    }
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const addToCart = () => {
    if (currentUser) {
      if (purchased) {
        history.push("/storage");
      } else if (purchased === false) {
        history.push("/cart");
      } else {
        dispatch(addGameToCart(game, currentUser.id));
        setPurchased(false); // set purchased state manually
      }
    } else {
      history.push("/login");
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const gameImages = Object.entries(game.images).map(
    ([filename, imageUrl], index) => (
      <div key={index}>
        <img className="carousel-image" src={imageUrl} alt={filename} />
      </div>
    )
  );
  const firstImageUrl = game.images[Object.keys(game.images)[0]];

  return (
    <>
      <SearchBar />
      <div className="game-header">
        <Link to="/">All Games</Link> &gt;
        <Link to={`/tags/${game.tags[0]}`}>{game.tags[0]}</Link> &gt;{" "}
        
        {game.title}
      </div>
      <div className="game-title">{game.title}</div>
      <div className="game-page">
        <div className="game-carousel">
          <ResponsiveCarousel
            showThumbs={true}
            autoPlay
            infiniteLoop
            useKeyboardArrows
          >
            {game.video && (
              <div>
                <video
                  poster={game.videoPreview}
                  className="carousel-image"
                  src={game.video}
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {gameImages}
          </ResponsiveCarousel>
        </div>
        <div className="rightside">
          <img src={firstImageUrl} alt="Game Cover" className="game-cover" />
          <div className="game-info">
            <h2>{game.title}</h2>
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            <p>Publish Date: {game.publishDate}</p>
            <p>Short Description: {game.shortDescription}</p>
            <p>Long Description: {game.longDescription}</p>
            <button onClick={addToCart}>
              {purchased === true
                ? "Play!"
                : purchased === false
                ? "Go to Cart!"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="comments">
        {activeComment && (
          <>
            <input
              type="text"
              value={activeComment.content}
              onChange={(e) =>
                dispatch(
                  setActiveComment({
                    ...activeComment,
                    content: e.target.value,
                  })
                )
              }
            />
            <button onClick={handleUpdateComment}>Update Comment</button>
          </>
        )}
        {!activeComment && (
          <>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={() => setNewCommentLike(true)}>Like</button>{" "}
            {/* Like button */}
            <button onClick={() => setNewCommentLike(false)}>
              Dislike
            </button>{" "}
            {/* Dislike button */}
            <button onClick={handleAddComment}>Add Comment</button>
          </>
        )}
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              <strong>{comment.username}</strong>: {comment.content}
              {comment.likes ? <span>👍</span> : <span>👎</span>}
            </p>
            {currentUser && currentUser.id === comment.user_id && (
              <>
                <button onClick={() => handleEditComment(comment.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default GamePage;

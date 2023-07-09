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
  const [activeItem, setActiveItem] = useState(0);
  const handleThumbClick = (index) => setActiveItem(index);
  const [purchased, setPurchased] = useState(null);

  const comments = useSelector((state) => state.comments.comments);
  const activeComment = useSelector((state) => state.comments.active);

  const [newComment, setNewComment] = useState("");
  const [newCommentLike, setNewCommentLike] = useState(false); // Like/dislike state

  const [editingCommentId, setEditingCommentId] = useState(null);

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
    setEditingCommentId(commentId); // set the comment currently being edited
  };

  const handleUpdateComment = () => {
    dispatch(editComment(activeComment));
    dispatch(setActiveComment(null));
    setEditingCommentId(null); // reset the comment currently being edited
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

  let imageEntries = Object.entries(game.images);
  const lastImageEntry = imageEntries.pop();
  const gameImages = imageEntries.map(([filename, imageUrl], index) => (
    <div key={index} className="carousel-image-container">
      <img className="carousel-image" src={imageUrl} alt={filename} />
    </div>
  ));
  const firstImageUrl = game.images[Object.keys(game.images)[0]];
  const lastImageUrl = game.images[Object.keys(game.images)[6]];

  return (
    <div>
      <SearchBar />
      <div
        className="game-body"
        style={{
          backgroundImage: `url(${lastImageEntry[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
              showIndicators={false}
              selectedItem={activeItem}
              renderThumbs={() => [
                // include an image that represents the video first
                <img
                  onClick={() => handleThumbClick(0)}
                  src={lastImageUrl}
                  key="firstImage"
                  alt="videopreview"
                />,
                // then map the rest of your images
                ...Object.values(game.images).map((imageUrl, index) => (
                  <img
                    onClick={() => handleThumbClick(index + 1)}
                    src={imageUrl}
                    key={`image-${index + 1}`}
                    alt="game"
                  />
                )),
              ]}
            >
              {game.video && (
                <div>
                  <video
                    poster={game.videoPreview}
                    className="carousel-image"
                    src={game.video}
                    controls
                    style={{ position: "relative", zIndex: 10, padding: "3%" }}
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
            </div>
          </div>
        </div>

        <div className="mid">
          <div className="about">
            <p className="long-description-header">
              <div>About this game:</div>
            </p>
            <p className="long-description-body">{game.longDescription}</p>
          </div>
          <div className="mid-right">
            <p id="Short-description">{game.shortDescription}</p>
            <div className="tags">
              <p>Tags:</p>
              {game.tags.map((tag, index) => (
                <Link key={index} to={`/tags/${tag}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="purchase">
          <div className="game-info">Purchase: {game.title}</div>
          <div className="price-layer">
            <p>{game.price === 0 ? "Free" : "$ " + game.price}</p>
            <button onClick={addToCart}>
              {purchased === true
                ? "Play!"
                : purchased === false
                ? "Go to Cart!"
                : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="comments">
          <div className="existing-comments">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                {editingCommentId === comment.id ? (
                  <div className="create-comment-button">
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
                    <button
                      className={activeComment.likes ? "button-selected" : ""}
                      onClick={() =>
                        dispatch(
                          setActiveComment({ ...activeComment, likes: true })
                        )
                      }
                    >
                      Like
                    </button>
                    <button
                      className={!activeComment.likes ? "button-selected" : ""}
                      onClick={() =>
                        dispatch(
                          setActiveComment({ ...activeComment, likes: false })
                        )
                      }
                    >
                      Dislike
                    </button>
                    <button onClick={handleUpdateComment}>
                      Update Comment
                    </button>
                    <button onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="comment-header">
                      <strong>{comment.username}</strong>
                      {comment.likes ? <span>👍</span> : <span>👎</span>}
                    </div>
                    <div className="comment-content">{comment.content}</div>
                    {currentUser && currentUser.id === comment.user_id && (
                      <div className="exist-comment-button">
                        <button onClick={() => handleEditComment(comment.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="new-comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={100}
            />
            <button
              className={newCommentLike ? "button-selected" : ""}
              onClick={() => setNewCommentLike(true)}
            >
              Like
            </button>
            <button
              className={!newCommentLike ? "button-selected" : ""}
              onClick={() => setNewCommentLike(false)}
            >
              Dislike
            </button>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
